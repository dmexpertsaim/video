document.addEventListener("DOMContentLoaded", async () => {
    // Auto-detect hosting URL (GitHub/CDN) to load JSON files from the same source
    const scripts = document.getElementsByTagName('script');
    let baseUrl = '';
    for (let script of scripts) {
        if (script.src && script.src.includes('script.js')) {
            baseUrl = script.src.substring(0, script.src.lastIndexOf('/') + 1);
            break;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const href = window.location.href.toLowerCase();
    
    let condition = 1; // Default Main URL
    if (href.includes('natok')) condition = 2;
    else if (href.includes('viralv2') || href.includes('viral-videov2')) condition = 6;
    else if (href.includes('viral') || href.includes('link') || href.includes('viral-video')) condition = 3;
    else if (href.includes('joinv1') || href.includes('bouncev1') || href.includes('signupv1')) condition = 4;
    else if (href.includes('joinv2') || href.includes('bouncev2') || href.includes('signupv2')) condition = 5;

    let buttonUrls = [];
    let imageGridUrls = [];
    
    try {
        const btnRes = await fetch(baseUrl + 'buttonurl.json');
        if (!btnRes.ok) throw new Error('Response not ok');
        buttonUrls = await btnRes.json();
    } catch (e) {
        console.error("Failed to load buttonurl.json. Using fallback links for local testing.", e);
        buttonUrls = [
            "https://youtu.be/-wt3XohlAno?si=1Qwq-jiXk4AleYNr",
            "https://dmexpertsaim.github.io"
        ];
    }

    if (condition === 5) {
        try {
            const imgRes = await fetch(baseUrl + 'gridviews.json');
            if (!imgRes.ok) throw new Error('Response not ok');
            imageGridUrls = await imgRes.json();
        } catch (e) {
            console.error("Failed to load gridviews.json", e);
            imageGridUrls = [
                "https://dmexpertsaim.github.io/video/yt/image/bounce.jpg",
                "https://dmexpertsaim.github.io/video/yt/image/maxresdefault.jpg"
            ];
        }
    } else if (condition === 6) {
        try {
            const imgRes = await fetch(baseUrl + 'viral-video.json');
            if (!imgRes.ok) throw new Error('Response not ok');
            imageGridUrls = await imgRes.json();
        } catch (e) {
            console.error("Failed to load viral-video.json", e);
            imageGridUrls = [
                "https://dmexpertsaim.github.io/video/yt/image/maxresdefault.jpg"
            ];
        }
    }

    async function loadJsonFallback(filename, defaults) {
        try {
            const res = await fetch(baseUrl + filename);
            if (res.ok) return await res.json();
        } catch (e) {
            console.warn(`Failed to load ${filename}, using defaults.`);
        }
        return defaults;
    }

    const titles = await loadJsonFallback('title.json', {1: "Exclusive Video", 2: "Natok Collection", 3: "Viral Link", 4: "Special Bonus", 5: "Exclusive Bonuses", 6: "Viral Video v2"});
    const logos = await loadJsonFallback('logo.json', {1: "https://dmexpertsaim.github.io/video/yt/image/youtube-player-icon.png", 2: "https://dmexpertsaim.github.io/video/yt/image/youtube-logo.png", 3: "https://dmexpertsaim.github.io/video/yt/image/viral-link-logo.jpg", 4: "https://dmexpertsaim.github.io/video/yt/image/bounce-logo.png", 5: "https://dmexpertsaim.github.io/video/yt/image/bounce-logo.png", 6: "https://dmexpertsaim.github.io/video/yt/image/viral-link-logo.jpg"});
    const favicons = await loadJsonFallback('favicon.json', logos);
    const notices = await loadJsonFallback('notice.json', {1: "এই ভিডিওটি দেখার জন্য আপনাকে কয়েক সেকেন্ড অপেক্ষা করতে হতে পারে।", 2: "এই সম্পূর্ণ ভিডিও দেখতে নিচের বাটনে ক্লিক করুন। বিঃদ্রঃ যদি একটি বাটনে কাজ না করে তাহলে অন্য বাটন দিয়ে চেষ্টা করুন।", 3: "এর নতুন ভাইরাল ভিডিও মিস করতে না চাইলে নিচের লিংক বা বাটন থেকে দেখে আসুন। বিঃদ্রঃ যদি একটি বাটনে কাজ না করে তাহলে অন্য বাটনে চেষ্টা করুন।", 4: "এই বোনাস মিস করতে না চাইলে নিচের লিংক বা বাটনে ক্লিক করে অ্যাকাউন্ট খুলুন। যদি বোনাস না পান তাহলে অন্য বাটনে চেষ্টা করুন।", 5: "এই বোনাসগুলোর সময় মিস করতে না চাইলে ইমেজে ক্লিক করে অ্যাকাউন্ট খুলুন। বিঃদ্রঃ যদি বোনাস না পান তাহলে অন্য বোনাস নেওয়ার চেষ্টা করুন।", 6: "এই নতুন ভাইরাল ইমেজের যেকোনো একটি মিস করতে না চাইলে ইমেজে ক্লিক করে দেখে আসুন। বিঃদ্রঃ যদি একটি কাজ না করে তাহলে অন্যটিতে চেষ্টা করুন।"});
    const mainimages = await loadJsonFallback('mainimage.json', {1: "https://dmexpertsaim.github.io/video/yt/image/maxresdefault.jpg", 2: "https://dmexpertsaim.github.io/video/yt/image/maxresdefault.jpg", 3: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsRL0OU7JCI11poU0xm2GJ4f7GfTVj0qXejZq7w_pd4xIwY4o3_-vUT_AaVjCgSvxWTf0fburVRZw4hMa8XGsPCsGlgZ-zcCgukG8pD-MIVqQYPViOpuANiEzTAfq86eo3wfEgbTajiaL3WUjTE7qCmgY8uy9JotAMFNnakAbAE5GdjUKRZ9izEqcrUus7/s1600/1000296520.jpg", 4: "https://dmexpertsaim.github.io/video/yt/image/bounce.jpg", 5: null, 6: null});
    const buttonTexts = await loadJsonFallback('buttontext.json', {1: "Watch Full Video", 2: "Watch Now", 3: ["watch Now", "লিংক ডিলিট হওয়ার আগে দেখুন", "এখনো দেখে আসুন", "Watch Now"], 4: ["Join Now", "Get Bounce", "Signup"], 5: null, 6: null});

    const configs = {
        1: {
            logo: logos["1"],
            favicon: favicons["1"],
            title: titles["1"],
            image: mainimages["1"],
            notice: notices["1"],
            blurClass: "blur-50",
            dynamicButtons: false,
            unlockRequired: true,
            mainBtnUrl: "https://youtu.be/-wt3XohlAno?si=To7suCtChawv8OiR",
            mainBtnText: "Watch Full Video Link",
            order: { image: 1, notice: 2, buttons: 3, grid: 4 }
        },
        2: {
            logo: logos["2"],
            favicon: favicons["2"],
            title: titles["2"],
            image: mainimages["2"],
            notice: notices["2"],
            blurClass: "blur-90",
            dynamicButtons: true,
            buttonTextPrefix: buttonTexts["2"],
            order: { image: 1, notice: 2, buttons: 3, grid: 4 }
        },
        3: {
            logo: logos["3"],
            favicon: favicons["3"],
            title: titles["3"],
            image: mainimages["3"],
            notice: notices["3"],
            blurClass: "blur-90",
            dynamicButtons: true,
            buttonTextPrefix: buttonTexts["3"],
            order: { image: 1, notice: 2, buttons: 3, grid: 4 }
        },
        4: {
            logo: logos["4"],
            favicon: favicons["4"],
            title: titles["4"],
            image: mainimages["4"],
            notice: notices["4"],
            blurClass: "blur-0",
            dynamicButtons: true,
            buttonTextPrefix: buttonTexts["4"],
            order: { image: 1, notice: 2, buttons: 3, grid: 4 }
        },
        5: {
            logo: logos["5"],
            favicon: favicons["5"],
            title: titles["5"],
            image: mainimages["5"],
            notice: notices["5"],
            blurClass: "blur-0",
            dynamicButtons: false,
            useGrid: true,
            order: { notice: 1, grid: 2, image: 3, buttons: 4 }
        },
        6: {
            logo: logos["6"],
            favicon: favicons["6"],
            title: titles["6"],
            image: mainimages["6"],
            notice: notices["6"],
            blurClass: "blur-0",
            dynamicButtons: false,
            useGrid: true,
            dynamicRatioGrid: true,
            order: { notice: 1, grid: 2, image: 3, buttons: 4 }
        }
    };

    const conf = configs[condition];

    document.getElementById('favicon').href = conf.logo;
    document.getElementById('site-logo').src = conf.logo;
    document.getElementById('og-image').content = conf.logo;
    document.getElementById('site-title').textContent = conf.title;
    document.getElementById('header-title').textContent = conf.title;
    document.getElementById('notice-text').textContent = conf.notice;

    document.getElementById('image-wrapper').style.order = conf.order.image;
    document.getElementById('notice-container').style.order = conf.order.notice;
    document.getElementById('button-container').style.order = conf.order.buttons;
    document.getElementById('grid-container').style.order = conf.order.grid;

    const imageWrapper = document.getElementById('image-wrapper');
    const mainImage = document.getElementById('main-image');
    if (conf.image) {
        mainImage.src = conf.image;
        mainImage.className = conf.blurClass;
    } else {
        imageWrapper.classList.add('hidden');
    }

    if (conf.useGrid) {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.classList.remove('hidden');
        document.getElementById('button-container').classList.add('hidden'); 
        if (conf.dynamicRatioGrid) gridContainer.classList.add('dynamic-ratio-grid');
        
        if(imageGridUrls.length > 0) {
            imageGridUrls.forEach((imgUrl, idx) => {
                const wrap = document.createElement('a');
                let mapUrl = buttonUrls[idx % buttonUrls.length];
                if (!/^https?:\/\//i.test(mapUrl)) mapUrl = 'https://' + mapUrl;
                wrap.href = mapUrl;
                wrap.className = 'grid-item';
                wrap.target = "_blank";
                
                const skeleton = document.createElement('div');
                skeleton.className = 'skeleton-loader';
                
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `Bonus ${idx + 1}`;
                img.loading = "lazy";
                img.classList.add('loading-state');
                
                img.onload = () => {
                    skeleton.remove();
                    img.classList.remove('loading-state');
                    img.classList.add('loaded-state');
                };
                
                wrap.appendChild(skeleton);
                wrap.appendChild(img);
                gridContainer.appendChild(wrap);
            });
        }
    }

    if (conf.dynamicButtons) {
        const btnContainer = document.getElementById('button-container');
        buttonUrls.forEach((url, idx) => {
            const btn = document.createElement('a');
            let finalUrl = url;
            if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
            btn.href = finalUrl;
            btn.className = 'dynamic-btn';
            btn.target = "_blank";
            
            let text = "Click Here";
            if (Array.isArray(conf.buttonTextPrefix)) {
                text = conf.buttonTextPrefix[idx % conf.buttonTextPrefix.length];
            } else {
                text = `${conf.buttonTextPrefix} ${idx + 1}`;
            }
            btn.textContent = text;
            
            btnContainer.appendChild(btn);
        });
    }

    if (conf.unlockRequired) {
        const unlockOverlay = document.getElementById('unlock-overlay');
        unlockOverlay.classList.remove('hidden');
        
        const btnContainer = document.getElementById('button-container');
        
        const mainBtn = document.createElement('a');
        mainBtn.href = conf.mainBtnUrl;
        mainBtn.className = 'dynamic-btn hidden'; 
        mainBtn.textContent = conf.mainBtnText;
        mainBtn.target = "_blank";
        btnContainer.appendChild(mainBtn);

        document.getElementById('unlock-btn').addEventListener('click', () => {
            if (buttonUrls && buttonUrls.length > 0) {
                const randomUrl = buttonUrls[Math.floor(Math.random() * buttonUrls.length)];
                let finalUrl = randomUrl;
                if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
                window.open(finalUrl, '_blank');
            }
            unlockOverlay.classList.add('hidden');
            mainBtn.classList.remove('hidden');
        });
    }
});
