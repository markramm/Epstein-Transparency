// Epstein Files Discharge Petition Tracker - Interactive Features

// Configuration - Will be loaded from signers.json
let PETITION_START_TIME = new Date('2025-09-03T10:00:00-04:00'); // Sept 3, 2025, 10 AM ET
let TOTAL_NEEDED = 218;
let CURRENT_SIGNATURES = 215; // Default values, will be updated from JSON

// Representative data
const representatives = [
    {
        name: "Jeff Van Drew",
        district: "NJ-02",
        phone: "202-225-6572",
        priority: "HIGHEST",
        position: "CO-SPONSORED the bill - can be THE hero who puts it over the top",
        oneLiner: "You wrote H.R. 185—be the hero who brings your own bill to a vote",
        talkingPoints: [
            "Actually co-sponsored H.R. 185 - showing early leadership",
            "Has unique opportunity to put the petition over the top",
            "Can be remembered as the Republican who made the difference"
        ],
        tweetTemplate: "@CongressmanJVD you CO-SPONSORED H.R. 185! You can be the hero who puts the discharge petition over the top. Join Nancy Mace and the courage coalition. Make history! 202-225-6572 #CourageCoalition"
    },
    {
        name: "Jen Kiggans",
        district: "VA-02",
        phone: "202-225-4215",
        priority: "HIGHEST",
        position: "Chairs VA Oversight & Investigations - her job is literally accountability",
        oneLiner: "Your brand is oversight and ethics—this is both. Sign and say so publicly",
        talkingPoints: [
            "Chairs Veterans Affairs Oversight and Investigations Subcommittee",
            "Voted to expel Santos citing 'highest standards of behavior and ethics'",
            "Navy veteran who said Congress needs 'highest ethical standards'"
        ],
        tweetTemplate: "@JenKiggans your leadership on oversight matters! Join Nancy Mace, MTG & Boebert in the courage coalition. Show Virginia that Republicans stand with survivors. 202-225-4215 #CourageCoalition"
    },
    {
        name: "Young Kim",
        district: "CA-40",
        phone: "202-225-4111",
        priority: "HIGH",
        position: "No public position",
        oneLiner: "You convene anti-trafficking stakeholders—stand with survivors now and sign",
        talkingPoints: [
            "Chairs Human Trafficking Task Force - this directly relates",
            "Orange County Register called for transparency",
            "Won by only 13,500 votes - every call matters"
        ],
        tweetTemplate: "@RepYoungKim your anti-trafficking leadership is needed! Join the Republican courage coalition with Mace, MTG & Boebert. California survivors are counting on you! 202-225-4111 #CourageCoalition"
    },
    {
        name: "Brian Fitzpatrick",
        district: "PA-01",
        phone: "202-225-4276",
        priority: "HIGH",
        position: "No public position",
        oneLiner: "Bipartisan leader, former FBI—model the standard: sign and help whip two",
        talkingPoints: [
            "Claims to be most bipartisan member - this is bipartisan",
            "Former FBI - should support transparency and justice",
            "Problem Solvers Caucus co-chair - solve this problem"
        ],
        tweetTemplate: "@RepBrianFitz this is your bipartisan moment! Join Massie (R) & Khanna (D) leading together. Show PA what real leadership looks like! 202-225-4276 #CourageCoalition"
    },
    {
        name: "Ashley Hinson",
        district: "IA-02",
        phone: "202-225-2911",
        priority: "HIGH",
        position: "Opposed in July but now under pressure",
        oneLiner: "An Ethics Committee member should lead on transparency—sign and call two peers",
        talkingPoints: [
            "Sits on House Ethics Committee - this is about ethics",
            "Running for Senate - Iowa voters are watching",
            "DNC already running ads on her opposition"
        ],
        tweetTemplate: "@RepAshleyHinson your Ethics Committee experience matters! Join the courage coalition. Show Iowa you stand with survivors like Nancy Mace did. 202-225-2911 #CourageCoalition"
    },
    {
        name: "Maria Elvira Salazar",
        district: "FL-27",
        phone: "202-225-3931",
        priority: "MEDIUM",
        position: "No public position",
        oneLiner: "You fought exploitation online—finish the job offline: sign and speak",
        talkingPoints: [
            "Authored TAKE IT DOWN Act to protect victims",
            "Won Emmys for exposing corruption",
            "Miami has 222 trafficking cases per year - most in Florida"
        ],
        tweetTemplate: "@RepMariaSalazar you've led on protecting victims before! Join the courage coalition. Miami survivors need your voice. Be the hero again! 202-225-3931 #CourageCoalition"
    },
    {
        name: "Don Bacon",
        district: "NE-02",
        phone: "202-225-4155",
        priority: "MEDIUM",
        position: "No public position",
        oneLiner: "You've crossed the aisle before—do it for survivors now",
        talkingPoints: [
            "Swing district - Biden won it in 2020",
            "Air Force General - should support transparency",
            "Faces tough re-election every cycle"
        ],
        tweetTemplate: "@RepDonBacon show your military courage extends to moral courage! Join fellow Republicans standing with survivors. Nebraska is watching! 202-225-4155 #CourageCoalition"
    },
    {
        name: "Eric Swalwell",
        district: "CA-14",
        phone: "202-225-5065",
        priority: "LOW",
        position: "Last Democrat to sign (211 of 212 have signed) - likely coming soon",
        oneLiner: "Complete the Democratic unity - be the 212th",
        talkingPoints: [
            "Last Democrat of 212 who hasn't signed yet",
            "Petition only filed Sept 2 - many just signed today",
            "On Judiciary Committee - likely just hasn't gotten to it yet"
        ],
        tweetTemplate: "@RepSwalwell complete the Democratic unity! 211 of your colleagues have signed the discharge petition. Be the 212th! Your signature matters. 202-225-5065 #EpsteinFiles"
    }
];

const republicansWhoSigned = [
    { name: "Thomas Massie", district: "KY-04", note: "Filed the petition" },
    { name: "Nancy Mace", district: "SC-01", note: "Sept 2" },
    { name: "Marjorie Taylor Greene", district: "GA-14", note: "Sept 2" },
    { name: "Lauren Boebert", district: "CO-04", note: "Sept 1" }
];

// Initialize tracking data
let trackingData = {
    lastUpdated: new Date().toISOString(),
    signatures: {
        current: CURRENT_SIGNATURES,
        needed: TOTAL_NEEDED,
        republicans: republicansWhoSigned.map(r => r.name),
        democratCount: 130
    },
    callReports: {
        swalwell: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        vandrew: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        kiggans: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        kim: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        fitzpatrick: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        hinson: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        salazar: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 },
        bacon: { total: 0, willSign: 0, considering: 0, wontSign: 0, noAnswer: 0 }
    }
};

// Load saved data from localStorage
function loadTrackingData() {
    const saved = localStorage.getItem('epsteinTrackerData');
    if (saved) {
        try {
            trackingData = JSON.parse(saved);
        } catch (e) {
            console.log('Using default tracking data');
        }
    }
}

// Save tracking data to localStorage
function saveTrackingData() {
    localStorage.setItem('epsteinTrackerData', JSON.stringify(trackingData));
}

// Load signature counts from signers.json
async function loadSignatureData() {
    try {
        const response = await fetch('data/signers.json');
        if (response.ok) {
            const data = await response.json();
            if (data.metadata) {
                CURRENT_SIGNATURES = data.metadata.total_signatures || CURRENT_SIGNATURES;
                TOTAL_NEEDED = data.metadata.total_needed || TOTAL_NEEDED;
                
                // Update the display elements
                const currentEl = document.getElementById('current');
                const neededEl = document.getElementById('needed');
                const progressBar = document.querySelector('.progress-bar');
                
                if (currentEl) currentEl.textContent = CURRENT_SIGNATURES;
                if (neededEl) neededEl.textContent = TOTAL_NEEDED - CURRENT_SIGNATURES;
                if (progressBar) {
                    progressBar.setAttribute('aria-valuenow', CURRENT_SIGNATURES);
                    progressBar.setAttribute('aria-valuemax', TOTAL_NEEDED);
                }
                
                // Update timestamp if available
                if (data.metadata.last_updated) {
                    const timestamp = document.getElementById('count-timestamp');
                    if (timestamp) {
                        const date = new Date(data.metadata.last_updated);
                        timestamp.textContent = `As of ${date.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZoneName: 'short'
                        })}`;
                    }
                }
            }
        }
    } catch (error) {
        console.error('Failed to load signature data:', error);
        // Continue with default values
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', async function() {
    await loadSignatureData(); // Load latest counts first
    loadTrackingData();
    updateDateTime();
    updateProgressBar();
    renderTargetTable();
    renderCourageSection(); // Changed from renderSignedList
    startCountdownTimer();
    setupEventListeners();
    addSocialMediaSection();
    addShareButtons();
});

// Update last updated time
function updateDateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    const updateElement = document.getElementById('update-time');
    if (updateElement) {
        updateElement.textContent = formatted;
    }
    
    // Update count timestamp
    const countTimestamp = document.getElementById('count-timestamp');
    if (countTimestamp) {
        countTimestamp.textContent = `As of ${formatted} ET`;
    }
}

// Update progress bar with animation
function updateProgressBar() {
    const percentage = (CURRENT_SIGNATURES / TOTAL_NEEDED) * 100;
    const fill = document.getElementById('progress-fill');
    const needed = TOTAL_NEEDED - CURRENT_SIGNATURES;
    
    if (fill) {
        // Animate the fill
        setTimeout(() => {
            fill.style.width = percentage + '%';
            
            // Add flashing effect for the last 2 needed
            if (needed <= 2) {
                fill.classList.add('almost-there');
            }
        }, 100);
    }
    
    // Update numbers
    const currentEl = document.getElementById('current');
    const neededEl = document.getElementById('needed');
    if (currentEl) currentEl.textContent = CURRENT_SIGNATURES;
    if (neededEl) neededEl.textContent = needed;
}

// Render target representatives table with expandable call scripts
function renderTargetTable() {
    const container = document.getElementById('target-table');
    if (!container) return;
    
    let html = '<div class="targets-grid">';
    
    representatives.forEach((rep, index) => {
        const priorityClass = rep.priority === 'HIGHEST' ? 'priority-highest' : 
                            rep.priority === 'HIGH' ? 'priority-high' : 'priority-medium';
        
        const repKey = rep.name.split(' ').pop().toLowerCase();
        const reports = trackingData.callReports[repKey] || { total: 0 };
        
        html += `
            <div class="rep-card ${priorityClass}">
                <div class="rep-header">
                    <h4>${rep.name} (${rep.district})</h4>
                    <span class="priority-badge">${rep.priority}</span>
                </div>
                <p class="rep-position">${rep.position}</p>
                ${rep.oneLiner ? `<p class="rep-oneliner">💬 "${rep.oneLiner}"</p>` : ''}
                <div class="rep-phone">
                    <a href="tel:${rep.phone}" class="phone-link">📞 ${rep.phone}</a>
                    <button class="script-toggle" onclick="toggleScript(${index})">
                        <span id="script-arrow-${index}">▼</span> What to Say
                    </button>
                </div>
                <div id="script-${index}" class="call-script" style="display: none;">
                    <div class="script-tabs">
                        <button class="script-tab active" onclick="showScriptVersion(${index}, 'quick')">Quick (45 sec)</button>
                        <button class="script-tab" onclick="showScriptVersion(${index}, 'full')">Full Script</button>
                        <button class="script-tab" onclick="showScriptVersion(${index}, 'three-asks')">Three Asks</button>
                    </div>
                    <div id="script-quick-${index}" class="script-content script-version">
                        <p><strong>Quick Script (45 seconds):</strong></p>
                        <p>"Hi, I'm from <input type="text" id="zip-quick-${index}" placeholder="[ZIP]" class="zip-input" onchange="updateZip(${index})">.</p>
                        <p>Survivors showed incredible courage speaking out despite threats. Nancy Mace, MTG, and Boebert found the courage to stand with them.</p>
                        <p>I'm asking ${rep.name} to join them by: 1) Signing the discharge petition, 2) Announcing it publicly, 3) Encouraging two colleagues.</p>
                        <p>Will ${rep.name} join the Republicans who are showing courage?"</p>
                    </div>
                    <div id="script-full-${index}" class="script-content script-version" style="display: none;">
                        <p><strong>Full Script:</strong></p>
                        <p>"Hi, I'm calling from <input type="text" id="zip-${index}" placeholder="[ZIP CODE]" class="zip-input" onchange="updateZip(${index})">.</p>
                        <p>This week, survivors showed incredible courage speaking out despite years of threats. Nancy Mace, a rape survivor herself, left their meeting in tears—but found the courage to sign the discharge petition.</p>
                        <p>${rep.name === 'Jeff Van Drew' ? 'Representative Van Drew actually CO-SPONSORED H.R. 185. He has a unique opportunity to be the hero who puts this over the top by signing his own bill.' : `MTG and Lauren Boebert also stood with survivors. ${rep.name} can join this bipartisan coalition of courage.`}</p>
                        <p>Will Representative ${rep.name} join Nancy Mace and the other Republicans who are standing with survivors?</p>
                        <p class="script-note">[Wait for response]</p>
                        <p>Thank you. This is about courage, not party. When can we expect the Representative to join the coalition?"</p>
                    </div>
                    <div id="script-three-asks-${index}" class="script-content script-version" style="display: none;">
                        <p><strong>The Three Asks:</strong></p>
                        <p>"Hi, I'm from <input type="text" id="zip-asks-${index}" placeholder="[ZIP]" class="zip-input" onchange="updateZip(${index})">.</p>
                        <p>Survivors courageously spoke at the Capitol. Nancy Mace, MTG, and Boebert stood with them. I'm asking ${rep.name} to join this bipartisan coalition:</p>
                        <ol>
                            <li><strong>Sign the discharge petition</strong> - join the courage coalition</li>
                            <li><strong>Announce it publicly</strong> - inspire others to follow</li>
                            <li><strong>Invite two colleagues</strong> - grow the coalition</li>
                        </ol>
                        <p>Will ${rep.name} join the Republicans showing leadership and courage?"</p>
                    </div>
                    <button class="copy-script-btn" onclick="copyCallScript(${index})">📋 Copy Script</button>
                    <div id="copy-confirm-${index}" class="copy-confirm" style="display: none;">✓ Copied!</div>
                </div>
                ${reports.total > 0 ? `
                <div class="call-reports">
                    <span class="report-count">📞 ${reports.total} calls reported</span>
                </div>
                ` : ''}
                <div class="action-bar">
                    <button class="action-compact call-btn" onclick="toggleScript(${index})" title="Call Script">
                        📞 Call
                    </button>
                    <button class="action-compact tweet-btn" onclick="tweetNow(${index})" title="Tweet at ${rep.name}">
                        🐦 Tweet
                    </button>
                    <button class="action-compact email-btn" onclick="emailRep(${index})" title="Email ${rep.name}">
                        ✉️ Email
                    </button>
                    <button class="action-compact report-btn" onclick="openReportForm('${repKey}')" title="Report Response">
                        📊 Report
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Add social media copy section
function addSocialMediaSection() {
    const amplifySection = document.getElementById('amplify-voices');
    if (!amplifySection) return;
    
    // Create new social media section
    const socialSection = document.createElement('section');
    socialSection.id = 'social-media-copy';
    socialSection.className = 'card';
    socialSection.innerHTML = `
        <h3>📱 Share on Social Media</h3>
        <p class="section-intro">Pre-written tweets for maximum impact. Copy and share!</p>
        <div class="tweets-grid">
            ${representatives.map((rep, index) => `
                <div class="tweet-box">
                    <h4>${rep.name}</h4>
                    <p class="tweet-text">${rep.tweetTemplate}</p>
                    <div class="tweet-actions">
                        <span class="char-count">${rep.tweetTemplate.length}/280</span>
                        <button class="copy-tweet-btn" onclick="copyTweet(${index})">📋 Copy</button>
                        <button class="tweet-now-btn" onclick="tweetNow(${index})">🐦 Tweet</button>
                    </div>
                    <div id="tweet-confirm-main-${index}" class="copy-confirm" style="display: none;">✓ Copied!</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Insert after amplify section
    amplifySection.parentNode.insertBefore(socialSection, amplifySection.nextSibling);
}

// Toggle call script visibility
function toggleScript(index) {
    const script = document.getElementById(`script-${index}`);
    const arrow = document.getElementById(`script-arrow-${index}`);
    
    if (script.style.display === 'none') {
        script.style.display = 'block';
        arrow.textContent = '▲';
        // Show quick script by default
        showScriptVersion(index, 'quick');
    } else {
        script.style.display = 'none';
        arrow.textContent = '▼';
    }
}

// Show specific script version
function showScriptVersion(index, version) {
    // Hide all versions
    const versions = ['quick', 'full', 'three-asks'];
    versions.forEach(v => {
        const elem = document.getElementById(`script-${v}-${index}`);
        if (elem) elem.style.display = 'none';
    });
    
    // Show selected version
    const selected = document.getElementById(`script-${version}-${index}`);
    if (selected) selected.style.display = 'block';
    
    // Update tab styles
    const tabs = document.querySelectorAll(`#script-${index} .script-tab`);
    tabs.forEach((tab, i) => {
        if (version === 'quick' && i === 0) tab.classList.add('active');
        else if (version === 'full' && i === 1) tab.classList.add('active');
        else if (version === 'three-asks' && i === 2) tab.classList.add('active');
        else tab.classList.remove('active');
    });
}

// Update ZIP code in script
function updateZip(index) {
    const zipInput = document.getElementById(`zip-${index}`);
    if (zipInput) {
        localStorage.setItem('userZip', zipInput.value);
        // Auto-fill other ZIP fields
        document.querySelectorAll('.zip-input').forEach(input => {
            if (input.id !== `zip-${index}`) {
                input.value = zipInput.value;
            }
        });
    }
}

// Copy call script to clipboard
async function copyCallScript(index) {
    const rep = representatives[index];
    const zipInput = document.getElementById(`zip-${index}`);
    const zip = zipInput ? zipInput.value : '[ZIP CODE]';
    
    const script = `Hi, I'm calling from ${zip}.

I'm asking Representative ${rep.name} to sign the discharge petition for releasing the Epstein files. Survivors of abuse stood at the Capitol asking for transparency.

Representatives Nancy Mace, Marjorie Taylor Greene, and Lauren Boebert have already signed.

Will Representative ${rep.name} sign the petition to support survivors and transparency?

[Wait for response]

Thank you. Can you tell me when the Representative will make a decision?`;

    try {
        await navigator.clipboard.writeText(script);
        showCopyConfirm(`copy-confirm-${index}`);
    } catch (err) {
        alert('Copy failed. Please select and copy manually.');
    }
}

// Copy tweet to clipboard
async function copyTweet(index) {
    const rep = representatives[index];
    try {
        await navigator.clipboard.writeText(rep.tweetTemplate);
        // Check both possible confirm elements
        const confirmId = document.getElementById(`tweet-confirm-${index}`) ? 
                         `tweet-confirm-${index}` : `tweet-confirm-main-${index}`;
        showCopyConfirm(confirmId);
    } catch (err) {
        alert('Copy failed. Please select and copy manually.');
    }
}

// Open Twitter with pre-filled tweet
function tweetNow(index) {
    const rep = representatives[index];
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(rep.tweetTemplate)}`;
    window.open(tweetUrl, '_blank');
}

// Show copy confirmation
function showCopyConfirm(elementId) {
    const confirm = document.getElementById(elementId);
    if (confirm) {
        confirm.style.display = 'inline-block';
        setTimeout(() => {
            confirm.style.display = 'none';
        }, 2000);
    }
}

// Render courage section with Republican women who signed
function renderSignedList() {
    // Legacy function - now redirects to courage section
    renderCourageSection();
}

// Render the courage section highlighting Republican women
function renderCourageSection() {
    const container = document.getElementById('courage-list');
    if (!container) return;
    
    const courageousWomen = [
        {
            name: "Nancy Mace",
            district: "SC-01",
            story: "Rape survivor who LEFT THE MEETING IN TEARS but still signed",
            twitter: "@RepNancyMace",
            tweetText: "Thank you @RepNancyMace for your courage. As a rape survivor, you left the meeting in tears but still stood with survivors. You chose conscience over party politics. This is true leadership. 🙏 #CourageOverParty"
        },
        {
            name: "Marjorie Taylor Greene",
            district: "GA-14",
            story: "Defied party leadership because constituents demanded action",
            twitter: "@RepMTG",
            tweetText: "Thank you @RepMTG for standing with survivors over party leadership. You listened to the 'highest volume of calls' from constituents and acted. This took courage. 🙏 #EpsteinFiles"
        },
        {
            name: "Lauren Boebert",
            district: "CO-04",
            story: "Risked her political career to do the right thing",
            twitter: "@RepBoebert",
            tweetText: "Thank you @RepBoebert for having the courage to stand with survivors. You defied party pressure and chose transparency. This is what integrity looks like. 🙏 #JusticeForSurvivors"
        }
    ];
    
    let html = '<div class="courage-profiles">';
    
    courageousWomen.forEach(woman => {
        html += `
            <div class="courage-profile">
                <h4>${woman.name} (${woman.district})</h4>
                <p class="courage-story">${woman.story}</p>
                <div class="thank-buttons">
                    <button class="thank-tweet-btn" onclick="thankTweet('${encodeURIComponent(woman.tweetText)}')">
                        🐦 Thank on Twitter
                    </button>
                    <button class="thank-share-btn" onclick="shareStory('${woman.name}', '${encodeURIComponent(woman.story)}')">
                        📢 Share Story
                    </button>
                </div>
            </div>
        `;
    });
    
    // Add survivor courage stories
    html += `
        <div class="survivor-courage-header">
            <h4>🦋 Survivor Courage</h4>
            <p class="survivor-intro">These survivors broke decades of silence despite intimidation, threats, and immense pressure to stay quiet:</p>
        </div>
    `;
    
    const survivors = [
        {
            name: "Marina Lacerda",
            story: "Key witness begging for transparency. Speaking publicly for FIRST TIME despite death threats",
            quote: "This is not a hoax",
            context: "Survivors are literally begging Congress for transparency with privacy protections",
            action: "amplify-marina"
        },
        {
            name: "Lisa Phillips", 
            story: "Survivor begging Congress to act. Faces daily harassment but keeps fighting",
            quote: "We matter now",
            context: "Survivors need just 2 more Republicans to get the transparency they're begging for",
            action: "amplify-lisa"
        },
        {
            name: "Anonymous Survivor",
            story: "Told her story for the very first time in the September 3rd Congressional meeting",
            quote: "Breaking silence after decades",
            context: "Overcame death threats and legal intimidation to speak to Congress",
            action: "support-survivors"
        }
    ];
    
    survivors.forEach(survivor => {
        html += `
            <div class="courage-profile survivor-profile">
                <h5>${survivor.name}</h5>
                <p class="courage-story survivor-story">${survivor.story}</p>
                <blockquote class="survivor-quote">"${survivor.quote}"</blockquote>
                <p class="survivor-context">${survivor.context}</p>
                <div class="survivor-actions">
                    <button class="amplify-btn" onclick="amplifySurvivor('${survivor.action}')">
                        📢 Amplify Voice
                    </button>
                </div>
            </div>
        `;
    });
    
    // Also add Massie as the leader
    html += `
        <div class="courage-profile massie">
            <h4>Thomas Massie (KY-04)</h4>
            <p class="courage-story">Filed the petition, leading the bipartisan effort</p>
            <div class="thank-buttons">
                <button class="thank-tweet-btn" onclick="thankTweet('${encodeURIComponent("Thank you @RepThomasMassie for leading this bipartisan effort. You're giving survivors hope and forcing transparency. True leadership! 🙏 #EpsteinFiles")}')">
                    🐦 Thank on Twitter
                </button>
            </div>
        </div>
    `;
    
    html += '</div>';
    
    // Add contrast section
    html += `
        <div class="courage-contrast">
            <p class="contrast-text">Meanwhile, <strong>Jeff Van Drew CO-SPONSORED the bill</strong> but won't sign. 
            These women have more courage than him.</p>
        </div>
    `;
    
    container.innerHTML = html;
}

// Start countdown timer
function startCountdownTimer() {
    function updateCountdown() {
        const now = new Date();
        const diff = now - PETITION_START_TIME;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        // Insert countdown after the subtitle
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            let countdown = document.getElementById('countdown-timer');
            if (!countdown) {
                countdown = document.createElement('div');
                countdown.id = 'countdown-timer';
                countdown.className = 'countdown-timer';
                subtitle.parentNode.insertBefore(countdown, subtitle.nextSibling);
            }
            
            // Increase red intensity based on days passed
            const redIntensity = Math.min(255, 180 + (days * 2));
            countdown.style.color = `rgb(${redIntensity}, 0, 0)`;
            
            countdown.innerHTML = `<strong>It has been ${days} days, ${hours} hours, ${minutes} minutes since survivors asked Congress for justice</strong>`;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Open report form modal
function openReportForm(repKey) {
    const repName = repKey.charAt(0).toUpperCase() + repKey.slice(1);
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('report-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'report-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeReportModal()">&times;</span>
                <h2>Report Call Response</h2>
                <form id="report-form" onsubmit="submitReport(event)">
                    <input type="hidden" id="report-rep" value="">
                    
                    <label for="report-office">Which office did you call?</label>
                    <select id="report-office" required>
                        <option value="">Select...</option>
                        <option value="swalwell">Eric Swalwell (CA-14) - ONLY DEM</option>
                        <option value="vandrew">Jeff Van Drew (NJ-02)</option>
                        <option value="kiggans">Jen Kiggans (VA-02)</option>
                        <option value="kim">Young Kim (CA-40)</option>
                        <option value="fitzpatrick">Brian Fitzpatrick (PA-01)</option>
                        <option value="hinson">Ashley Hinson (IA-02)</option>
                        <option value="salazar">Maria Elvira Salazar (FL-27)</option>
                        <option value="bacon">Don Bacon (NE-02)</option>
                    </select>
                    
                    <label for="report-response">What did they say?</label>
                    <select id="report-response" required>
                        <option value="">Select...</option>
                        <option value="willSign">Will sign</option>
                        <option value="considering">Considering</option>
                        <option value="wontSign">Won't sign</option>
                        <option value="noAnswer">No answer/Took message</option>
                    </select>
                    
                    <label for="report-notes">Additional notes (optional)</label>
                    <textarea id="report-notes" rows="3"></textarea>
                    
                    <label for="report-state">Your state</label>
                    <select id="report-state" required>
                        <option value="">Select...</option>
                        <option value="NJ">New Jersey</option>
                        <option value="VA">Virginia</option>
                        <option value="CA">California</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="IA">Iowa</option>
                        <option value="FL">Florida</option>
                        <option value="NE">Nebraska</option>
                        <option value="other">Other</option>
                    </select>
                    
                    <button type="submit" class="submit-btn">Submit Report</button>
                </form>
                <div id="report-summary"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Set the office dropdown to the clicked rep
    document.getElementById('report-office').value = repKey;
    modal.style.display = 'block';
    
    // Show current stats
    updateReportSummary();
}

// Close report modal
function closeReportModal() {
    const modal = document.getElementById('report-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Submit report
function submitReport(event) {
    event.preventDefault();
    
    const office = document.getElementById('report-office').value;
    const response = document.getElementById('report-response').value;
    
    if (office && response) {
        // Update tracking data
        trackingData.callReports[office].total++;
        trackingData.callReports[office][response]++;
        
        // Save to localStorage
        saveTrackingData();
        
        // Show confirmation
        alert('Thank you for reporting! Your response has been recorded.');
        
        // Update display
        renderTargetTable();
        updateReportSummary();
        
        // Reset form
        document.getElementById('report-form').reset();
        closeReportModal();
    }
}

// Update report summary in modal
function updateReportSummary() {
    const summary = document.getElementById('report-summary');
    if (!summary) return;
    
    let html = '<h3>Current Call Reports:</h3><ul>';
    
    Object.keys(trackingData.callReports).forEach(key => {
        const data = trackingData.callReports[key];
        if (data.total > 0) {
            const name = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<li><strong>${name}:</strong> ${data.total} calls 
                    (${data.considering} considering, ${data.willSign} will sign, 
                    ${data.wontSign} won't sign, ${data.noAnswer} no answer)</li>`;
        }
    });
    
    html += '</ul>';
    summary.innerHTML = html;
}

// Add share buttons to footer
function addShareButtons() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const shareSection = document.createElement('div');
    shareSection.className = 'share-buttons';
    shareSection.innerHTML = `
        <p>Share this tracker:</p>
        <button onclick="shareOnTwitter()" class="share-btn twitter">🐦 Twitter</button>
        <button onclick="shareOnFacebook()" class="share-btn facebook">📘 Facebook</button>
        <button onclick="shareOnReddit()" class="share-btn reddit">🟠 Reddit</button>
    `;
    
    footer.insertBefore(shareSection, footer.firstChild);
}

// Share buttons
function shareOnTwitter() {
    const text = 'Survivors showed courage. Nancy Mace (R) showed courage. MTG & Boebert showed courage. Just 2 more Republicans needed to join the #CourageCoalition:';
    const url = 'https://markramm.github.io/Epstein-Transparency/';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function shareOnFacebook() {
    const url = 'https://markramm.github.io/Epstein-Transparency/';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

function shareOnReddit() {
    const url = 'https://markramm.github.io/Epstein-Transparency/';
    const title = 'Courage Coalition: 2 Republicans Away from Justice for Epstein Survivors';
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank');
}

// Rep-specific email generator
function emailRep(index) {
    const rep = representatives[index];
    const zip = localStorage.getItem('userZip') || prompt('Enter your ZIP code:');
    if (!zip) return;
    
    // Save ZIP for future use
    localStorage.setItem('userZip', zip);
    
    const subject = `Constituent Request: Sign Epstein Files Discharge Petition`;
    
    // Customize email based on rep's specific situation
    let customParagraph = '';
    
    if (rep.name === 'Eric Swalwell') {
        customParagraph = `I'm deeply concerned that you are the ONLY Democrat out of 212 who hasn't signed the discharge petition. Every other Democrat - including Henry Cuellar who's under federal indictment, Jared Golden in a Trump+6 district, and Marie Gluesenkamp Pérez in a deep red district - has signed. As a Judiciary Committee member who regularly advocates for accountability and transparency, this absence is particularly puzzling. Your Democratic colleagues need you to complete the unity on this issue.`;
    } else if (rep.name === 'Jeff Van Drew') {
        customParagraph = `I'm particularly concerned that you co-sponsored H.R. 185 but have not signed the discharge petition. This seems contradictory - if you believed in the bill enough to co-sponsor it, why won't you help bring it to a vote?`;
    } else if (rep.name === 'Jen Kiggans') {
        customParagraph = `As Chair of the VA Oversight & Investigations Subcommittee, you have a special responsibility for accountability. You voted to expel George Santos citing "highest standards of behavior and ethics." This issue demands those same standards.`;
    } else if (rep.name === 'Young Kim') {
        customParagraph = `As Chair of the Human Trafficking Task Force, this issue directly relates to your work. The Orange County Register has called for transparency, and your constituents expect leadership on this issue.`;
    } else if (rep.name === 'Brian Fitzpatrick') {
        customParagraph = `You're known as the most bipartisan member of Congress. This is a truly bipartisan issue, led by Thomas Massie (R) and Ro Khanna (D). Your former FBI background means you understand the importance of transparency in justice.`;
    } else if (rep.name === 'Ashley Hinson') {
        customParagraph = `As a member of the House Ethics Committee, you understand the importance of ethical standards. While you opposed this in July, the situation has evolved with survivors directly appealing to Congress.`;
    } else if (rep.name === 'Maria Elvira Salazar') {
        customParagraph = `You authored the TAKE IT DOWN Act to protect victims and won Emmys for exposing corruption. Miami has 222 trafficking cases per year. Your constituents expect you to finish the job on transparency.`;
    } else if (rep.name === 'Don Bacon') {
        customParagraph = `Your swing district expects transparency and accountability. As a retired Air Force General, you understand the importance of integrity and justice.`;
    }
    
    const body = `Dear Representative ${rep.name},

As your constituent in ${zip}, I am writing to urge you to sign the discharge petition for releasing Epstein-related government files.

${customParagraph}

On September 3, six survivors met with Congress for over two hours. Nancy Mace left the meeting in tears. One woman told her story for the first time ever in that room. Chairman Comer called it "the most bipartisan thing I've seen in 9 years."

This bipartisan effort includes critical protections for survivors while ensuring transparency:
• Presumption of release with narrow exemptions
• Independent review board including survivor advocates
• Automatic privacy protections for minors
• Public accountability through disclosure indices

With 134 signatures already secured, we need just 84 more to force a vote. Republicans Nancy Mace, Marjorie Taylor Greene, and Lauren Boebert have already signed, defying party leadership to stand with survivors.

I respectfully request that you sign the discharge petition. Please let me know your position on this matter.

Sincerely,
[Your Name]
${zip}`;

    // Create mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
}

// Legacy email generator (keep for backwards compatibility)
function generateEmail() {
    emailRep(0); // Default to first rep
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.onclick = function(event) {
        const reportModal = document.getElementById('report-modal');
        const callModal = document.getElementById('call-modal');
        
        if (event.target === reportModal) {
            reportModal.style.display = 'none';
        }
        if (event.target === callModal) {
            callModal.style.display = 'none';
        }
    };
    
    // Load saved ZIP code
    const savedZip = localStorage.getItem('userZip');
    if (savedZip) {
        document.querySelectorAll('.zip-input').forEach(input => {
            input.value = savedZip;
        });
    }
}

// Legacy modal functions (for existing buttons)
function showCallScript() {
    const modal = document.getElementById('call-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('call-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyScript() {
    const scriptText = document.querySelector('.script-box').innerText;
    navigator.clipboard.writeText(scriptText).then(() => {
        alert('Script copied to clipboard!');
    });
}

// Thank you tweet function
function thankTweet(tweetText) {
    const decoded = decodeURIComponent(tweetText);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(decoded)}`;
    window.open(tweetUrl, '_blank');
}

// Amplify survivor voices
function amplifySurvivor(action) {
    const amplifyActions = {
        'amplify-marina': {
            message: `Marina Lacerda is BEGGING for transparency: "This is not a hoax."

She spoke despite death threats.
MTG heard her and signed.
Nancy Mace left in tears but signed.

Survivors need just 2 more Republicans. #CourageCoalition #EpsteinFiles`,
            searchUrl: 'https://twitter.com/search?q=%22Marina%20Lacerda%22&src=typed_query&f=live'
        },
        'amplify-lisa': {
            message: `Lisa Phillips is BEGGING Congress: "We matter now."

Survivors are asking for transparency with privacy protections.
MTG understood and signed.
Mace understood and signed.

Just 2 more Republicans needed to give survivors what they're begging for. #CourageCoalition 

This is courage. Amplify survivor voices. #EpsteinFiles #WeMatterNow`,
            searchUrl: 'https://twitter.com/search?q=%22Lisa%20Phillips%22%20Epstein&src=typed_query&f=live'
        },
        'support-survivors': {
            message: `A survivor told her story for the FIRST TIME EVER in the Sept 3 Congressional meeting. 

She overcame death threats and legal intimidation to speak. Nancy Mace left in tears after hearing her story.

This is why transparency with privacy protections matters. #EpsteinFiles`,
            searchUrl: 'https://twitter.com/search?q=Epstein%20survivors%20Congress&src=typed_query&f=live'
        }
    };
    
    const selectedAction = amplifyActions[action];
    if (selectedAction) {
        // Try Web Share API first, fallback to Twitter
        if (navigator.share) {
            navigator.share({
                text: selectedAction.message,
                url: 'https://markramm.github.io/Epstein-Transparency/'
            }).catch(() => {
                // Fallback to Twitter
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedAction.message)}`;
                window.open(url, '_blank');
            });
        } else {
            // Direct to Twitter
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedAction.message)}`;
            window.open(url, '_blank');
        }
        
        // Also open search to find more content to amplify
        setTimeout(() => {
            window.open(selectedAction.searchUrl, '_blank');
        }, 1000);
    }
}

// Share courage story function
function shareStory(name, story) {
    const decoded = decodeURIComponent(story);
    const shareText = `${name}: ${decoded}\n\nThis is what courage looks like. These Republican women defied their party to stand with survivors.\n\nhttps://markramm.github.io/Epstein-Transparency/`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: `${name} Shows True Courage`,
            text: shareText,
            url: 'https://markramm.github.io/Epstein-Transparency/'
        }).catch(err => {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Story copied to clipboard! Share it everywhere.');
            });
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Story copied to clipboard! Share it everywhere.');
        });
    }
}

// Make functions globally available
window.toggleScript = toggleScript;
window.updateZip = updateZip;
window.copyCallScript = copyCallScript;
window.copyTweet = copyTweet;
window.tweetNow = tweetNow;
window.openReportForm = openReportForm;
window.closeReportModal = closeReportModal;
window.submitReport = submitReport;
window.shareOnTwitter = shareOnTwitter;
window.shareOnFacebook = shareOnFacebook;
window.shareOnReddit = shareOnReddit;
window.generateEmail = generateEmail;
window.showCallScript = showCallScript;
window.closeModal = closeModal;
window.copyScript = copyScript;
window.thankTweet = thankTweet;
window.shareStory = shareStory;
window.renderCourageSection = renderCourageSection;
window.emailRep = emailRep;
window.amplifySurvivor = amplifySurvivor;
window.showScriptVersion = showScriptVersion;