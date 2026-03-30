document.addEventListener('DOMContentLoaded', () => {
    // Search term detection
    var _search_terms = ["nonton bola live", "jalalive", "alternatif jalalive", "nobar", "situs nobar", "jadwal bola hari ini", "tv online", "live streaming", "live streaming bola", "tv online gratis"];
    var _text = document.title + " " + (document.querySelector('meta[name="description"]')?.content || "");
    _text = _text.toLowerCase();
    var _term_found = _search_terms.some(function (_term) { return _text.indexOf(_term) > -1; });
    console.log('Search term found:', _term_found);

    const matchesGrid = document.getElementById('matches-grid');
    const loader = document.getElementById('loader');

    // Raw match data
    const rawData = `Senin, 30 Maret 2026
00:00	AS Roma vs Lecce	Liga Italia	Vidio
00:30	Athletic Bilbao vs Real Betis	Liga Spanyol	beIN Sports 1
01:00	Wydad AC vs Olympique de Safi	Piala Konfederasi Afrika	beIN Sports 3
01:30	Augsburg vs Stuttgart	Liga Jerman	Vision+
02:00	USM Alger vs Maniema Union	Piala Konfederasi Afrika	beIN Sports Xtra
02:45	Fiorentina vs Inter Milan	Liga Italia	Vidio
03:00	Real Madrid vs Atletico Madrid	Liga Spanyol	beIN Sports 1
15:30	St Kitts and Nevis vs Solomon Islands	FIFA Series 2026	Vidio
20:00	Indonesia vs Bulgaria	FIFA Series 2026	Indosiar / SCTV

Selasa, 31 Maret 2026
02:30	Castellón vs Cultural Leonesa	Liga Spanyol Segunda	beIN Sports 2

Rabu, 1 April 2026
00:45	Wolfsburg vs Lyon	Liga Champions Wanita	beIN Sports 1
03:00	Arsenal vs Chelsea	Liga Champions Wanita	beIN Sports 1

Kamis, 2 April 2026
00:45	Real Madrid vs Barcelona	Liga Champions Wanita	beIN Sports 1
03:00	Manchester United vs Bayern Munich	Liga Champions Wanita	beIN Sports 1`;

    const matches = [];
    let currentDayStr = '2026-03-20';
    let currentRawDateStr = 'Jumat, 20 Maret 2026';
    const monthMap = { 'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08', 'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12' };

    rawData.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.includes('Kick-Off')) return;

        // Check if it's a date line
        const dateMatch = line.match(/^(?:Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*(\d{1,2})\s*([A-Za-z]+)\s*(\d{4})/);
        if (dateMatch) {
            currentRawDateStr = line;
            let day = dateMatch[1].padStart(2, '0');
            let month = monthMap[dateMatch[2]] || '03';
            let year = dateMatch[3];
            currentDayStr = `${year}-${month}-${day}`;
            return;
        }

        // Must be a match line (split by tabs)
        let parts = line.split('\t');
        
        if (parts.length >= 4) {
             const time = parts[0].trim();
             const title = parts[1].trim();
             const league = parts[2].trim();
             const tv = parts[3].trim();

             const teams = title.split(' vs ');
             const home = teams[0] ? teams[0].trim() : 'Home';
             const away = teams[1] ? teams[1].trim() : 'Away';

             matches.push({
                 starting_at: `${currentDayStr}T${time}:00+07:00`,
                 time_str: time,
                 date_title: currentRawDateStr,
                 stage: { name: league },
                 tv: tv,
                 participants: [
                     { name: home, meta: { location: 'home' } },
                     { name: away, meta: { location: 'away' } }
                 ]
             });
        }
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    // ---- Skeleton loading ----
    const skeletonBody = document.getElementById('skeleton-body');
    if (skeletonBody) {
        skeletonBody.innerHTML = ''; // Clear initial if any
        for (let i = 0; i < 5; i++) {
            skeletonBody.innerHTML += `
                <tr class="skeleton-row">
                    <td><div class="skeleton sk-short"></div></td>
                    <td><div class="skeleton sk-long"></div></td>
                    <td><div class="skeleton sk-med"></div></td>
                </tr>`;
        }
    }

    const renderMatches = () => {
        // Find existing skeleton and clear it
        if (skeletonBody) skeletonBody.innerHTML = '';
        
        let htmlContent = '';
        let lastDateTitle = '';
        
        matches.forEach((match) => {
            if (match.date_title !== lastDateTitle) {
                if (lastDateTitle !== '') {
                    htmlContent += `</tbody></table></div>`;
                }
                
                lastDateTitle = match.date_title;
                htmlContent += `
                    <div class="day-group">
                        <div class="day-label">${match.date_title}</div>
                        <table class="match-table">
                            <thead>
                                <tr>
                                    <th>Kick-off (WIB)</th>
                                    <th>Pertandingan</th>
                                    <th>Kompetisi</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
            }
            
            let homeTeam = match.participants.find(p => p.meta && p.meta.location === 'home') || match.participants[0];
            let awayTeam = match.participants.find(p => p.meta && p.meta.location === 'away') || match.participants[1];
            
            htmlContent += `
                <tr>
                    <td class="time">${match.time_str}</td>
                    <td class="match-name">${homeTeam.name} <span style="color:var(--text-muted);font-weight:400;">vs</span> ${awayTeam.name}</td>
                    <td class="competition">${match.stage ? match.stage.name : '-'}</td>
                </tr>
            `;
        });
        
        if (matches.length > 0) {
            htmlContent += `</tbody></table></div>`;
        }
        
        if (matchesGrid) {
            matchesGrid.innerHTML = htmlContent;
            matchesGrid.style.display = 'block';
        }
    };

    // Simulate small delay for skeleton effect visibility if desired, 
    // but here we just render immediately
    renderMatches();

    // ---- Active nav on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
});
