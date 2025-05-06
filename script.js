document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen for 2.5 seconds
    setTimeout(() => {
        document.querySelector('.loading-overlay').classList.add('hidden');
        
        // Start background effects
        createBubbles();
        setInterval(createBubbles, 10000);
        
        // Display welcome message
        showMessage("Happy Birthday Eman! Click to open your card ❤️", 5000);
    }, 2500);
    
    // Initialize particles.js with enhanced configuration
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 25,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ff6b9d", "#a65af1", "#ffd0e0"]
            },
            "shape": {
                "type": ["circle", "triangle", "heart"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 2,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 10,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Background music setup with better options
    const sound = new Howl({
        src: ['https://cdn.jsdelivr.net/gh/rafaelreis-hotmart/Audio-Sample-files@master/sample-15s.mp3'],
        html5: true,
        volume: 0.4,
        loop: true,
        onload: function() {
            console.log('Birthday music loaded successfully');
        },
        onloaderror: function() {
            console.log('Error loading music, fallback to silence');
            // Fallback to silence if music fails to load
            this.src = ['https://cdn.jsdelivr.net/gh/anars/blank-audio@master/1-second-of-silence.mp3'];
        }
    });
    
    // YouTube player variable
    let player;
    
    // Add this to your script.js file
    
    // Fallback audio using Howler.js
    let fallbackAudio = null;
    
    // Initialize YouTube player
    function onYouTubeIframeAPIReady() {
        try {
            player = new YT.Player('youtubePlayer', {
                height: '0',
                width: '0',
                videoId: '2Oy-_7M9Rbg', // Updated to your new video ID
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });
        } catch (error) {
            console.error("YouTube player initialization error:", error);
            initializeFallbackAudio();
        }
    }
    
    // Handle YouTube player errors
    function onPlayerError(event) {
        console.error("YouTube player error:", event.data);
        initializeFallbackAudio();
    }
    
    // Initialize fallback audio
    function initializeFallbackAudio() {
        console.log("Initializing fallback audio...");
        fallbackAudio = new Howl({
            src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'], // Replace with your fallback audio URL
            html5: true,
            volume: 0.7
        });
        
        // Update play/pause buttons to use fallback audio
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (playBtn && pauseBtn) {
            playBtn.addEventListener('click', function() {
                fallbackAudio.play();
                showPauseButton();
            });
            
            pauseBtn.addEventListener('click', function() {
                fallbackAudio.pause();
                showPlayButton();
            });
        }
        
        document.querySelector('.audio-title').textContent = "Birthday Song (Fallback)";
    }
    
    // Handle player state changes
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            showPlayButton();
        }
    }

    // Play/Pause functionality
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    function showPlayButton() {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    }

    function showPauseButton() {
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }

    // Enable buttons when player is ready
    function onPlayerReady(event) {
        console.log("YouTube player is ready");
        
        // Now that player is ready, add event listeners
        playBtn.addEventListener('click', () => {
            if (player && typeof player.playVideo === 'function') {
                player.playVideo();
                showPauseButton();
                showMessage("🎵 Music playing...", 1500);
            } else {
                console.error("Player or playVideo method is not available");
                // Try fallback audio if available
                if (fallbackAudio) {
                    fallbackAudio.play();
                    showPauseButton();
                    showMessage("🎵 Music playing (fallback)...", 1500);
                }
            }
        });

        pauseBtn.addEventListener('click', () => {
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
                showPlayButton();
            } else {
                console.error("Player or pauseVideo method is not available");
                // Try fallback audio if available
                if (fallbackAudio) {
                    fallbackAudio.pause();
                    showPlayButton();
                }
            }
        });
        
        // Enable buttons
        playBtn.disabled = false;
        pauseBtn.disabled = false;
    }

    // Remove these event listeners from here since we're adding them in onPlayerReady
    // playBtn.addEventListener('click', () => {
    //     player.playVideo();
    //     showPauseButton();
    //     showMessage("🎵 Music playing...", 1500);
    // });

    // pauseBtn.addEventListener('click', () => {
    //     player.pauseVideo();
    //     showPlayButton();
    // });

    showMessage("Music paused", 1500);
    
    // Enhanced Card opening animation
    const cardCover = document.querySelector('.card-cover');
    const cardContainer = document.querySelector('.card-container');
    
    cardCover.addEventListener('click', function() {
        // Play card opening sound
        const openSound = new Howl({
            src: ['https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/word-audio/page.mp3'],
            volume: 0.3
        });
        openSound.play();
        
        cardContainer.classList.add('open-card');
        
        // Staggered reveal of sections
        setTimeout(revealSections, 1200);
        
        // Create visual effects
        createConfetti();
        setTimeout(createSnowfall, 1500);
        
        // Try to play music when card is opened (requires user interaction)
        try {
            sound.play();
            playBtn.classList.add('hidden');
            pauseBtn.classList.remove('hidden');
        } catch (error) {
            console.log("Autoplay prevented:", error);
        }
        
        // Welcome message inside card
        setTimeout(() => {
            showMessage("Happy Birthday Eman! This card is made with love for you ❤️", 4000);
        }, 2000);
    });
    
    // Heart button with enhanced animation
    const heartBtn = document.querySelector('.btn-heart');
    heartBtn.addEventListener('click', function() {
        animateHearts();
        showMessage("Thank you for being part of my life ❤️", 3000);
        
        // Show special SweetAlert message
        setTimeout(() => {
            Swal.fire({
                title: 'You\'re Special',
                text: 'Your smile brightens my day, and your memory fills my heart.',
                icon: 'success',
                confirmButtonText: 'Thank You',
                confirmButtonColor: '#ff6b9d',
                background: document.body.classList.contains('dark-mode') ? '#272741' : '#fff',
                color: document.body.classList.contains('dark-mode') ? '#fff' : '#333'
            });
        }, 1000);
    });
    
    // Enhanced reveal sections gradually
    function revealSections() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('show-section');
                
                // Add sparkle effect when each section appears
                if (window.innerWidth > 640) { // Only on larger screens
                    createSparkleEffect(section);
                }
            }, index * 300);
        });
    }
    
    // Enhanced sparkle effect
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkleColors = ['#FFD700', '#FFEB3B', '#FFC107', '#FF9800', '#FFFFFF'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle');
                
                // Random position within the element
                const top = rect.top + Math.random() * rect.height;
                const left = rect.left + Math.random() * rect.width;
                const size = Math.random() * 6 + 4;
                
                sparkle.style.top = `${top}px`;
                sparkle.style.left = `${left}px`;
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;
                sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px 2px ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]}`;
                
                document.body.appendChild(sparkle);
                
                // Animate the sparkle
                gsap.to(sparkle, {
                    opacity: 1, 
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(sparkle, {
                            opacity: 0,
                            scale: 1.8,
                            duration: 0.7,
                            delay: 0.2,
                            onComplete: () => {
                                sparkle.remove();
                            }
                        });
                    }
                });
            }, i * 150);
        }
    }
    
    // Enhanced floating hearts animation
    function animateHearts() {
        const heartColors = ['#ff6b9d', '#d14b7a', '#ff4d82', '#ff80ab', '#ec407a'];
        const heartSizes = [15, 20, 25, 30, 35];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '<i class="fas fa-heart"></i>';
                heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
                heart.classList.add('text-2xl', 'absolute');
                heart.style.left = `${50 + (Math.random() * 40 - 20)}vw`;
                heart.style.top = '85vh';
                heart.style.position = 'fixed';
                heart.style.zIndex = '9999';
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                heart.style.fontSize = `${heartSizes[Math.floor(Math.random() * heartSizes.length)]}px`;
                heart.style.filter = 'drop-shadow(0 0 2px rgba(0,0,0,0.2))';
                document.body.appendChild(heart);
                
                const duration = Math.random() * 3 + 2;
                const rotate = Math.random() * 360;
                const xMovement = Math.random() * 100 - 50;
                
                gsap.to(heart, {
                    y: -window.innerHeight,
                    x: xMovement,
                    rotation: rotate,
                    duration: duration,
                    ease: "power1.out",
                    onComplete: function() {
                        heart.remove();
                    }
                });
            }, i * 100);
        }
    }
    
    // Enhanced cat animation interactions
    const cat = document.getElementById('cat');
    let catMeowed = false;
    
    // Add cat meow on hover with better sound options
    cat.addEventListener('mouseenter', function() {
        if (!catMeowed) {
            const meowSounds = [
                'https://cdn.jsdelivr.net/gh/fawazahmed0/cat-shorcut@1/audio/cat_meow.mp3',
                'https://cdn.jsdelivr.net/gh/fawazahmed0/cat-shorcut@1/audio/cat_purr.mp3'
            ];
            
            const meow = new Howl({
                src: [meowSounds[Math.floor(Math.random() * meowSounds.length)]],
                volume: 0.3
            });
            
            meow.play();
            
            gsap.to(cat, {
                scale: 1.3,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
            
            catMeowed = true;
            
            // Reset flag after delay
            setTimeout(() => {
                catMeowed = false;
            }, 5000);
        }
    });
    
    // Improved cat following cursor behavior
    let followMouse = false;
    let mouseX = 0;
    let mouseY = 0;
    
    // Toggle follow mode randomly
    setInterval(() => {
        followMouse = !followMouse;
        if (followMouse) {
            cat.style.animation = 'none';
            showMessage("The cat is following your cursor! 🐱", 2000);
        } else {
            cat.style.animation = 'catWalk 30s linear infinite alternate';
        }
    }, 15000);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (followMouse) {
            gsap.to(cat, {
                left: mouseX - 30,
                top: mouseY - 30,
                duration: 1,
                ease: "power2.out"
            });
            
            // Flip cat based on movement direction
            if (e.movementX > 0) {
                cat.style.transform = 'scaleX(1)';
            } else if (e.movementX < 0) {
                cat.style.transform = 'scaleX(-1)';
            }
        }
    });
    
    // Enhanced Gift box animation
    const giftBox = document.getElementById('giftBox');
    const coffeeText = document.querySelector('.coffee-text');
    
    giftBox.addEventListener('click', function() {
        if (!giftBox.classList.contains('gift-open')) {
            // Play enhanced unwrap sound
            const unwrapSound = new Howl({
                src: ['https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/unwrap.mp3'],
                volume: 0.5
            });
            
            unwrapSound.play();
            
            // Add open class to start animation
            giftBox.classList.add('gift-open');
            coffeeText.classList.remove('hidden');
            
            // Create sparkles around the coffee cup
            setTimeout(createCoffeeSparkles, 800);
            
            // Show a coffee date message
            setTimeout(() => {
                Swal.fire({
                    title: 'Coffee Date?',
                    text: 'I would love to catch up over a coffee with you sometime.',
                    imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2615.png',
                    imageWidth: 80,
                    imageHeight: 80,
                    imageAlt: 'Coffee cup',
                    confirmButtonText: 'I\'d Like That',
                    confirmButtonColor: '#8B4513',
                    showCancelButton: true,
                    cancelButtonText: 'Maybe Later',
                    cancelButtonColor: '#a65af1',
                    background: document.body.classList.contains('dark-mode') ? '#272741' : '#fff',
                    color: document.body.classList.contains('dark-mode') ? '#fff' : '#333'
                }).then((result) => {
                    if (result.isConfirmed) {
                        showMessage("Looking forward to our coffee date! 😊", 3000);
                    } else {
                        showMessage("The offer is always open ☕", 3000);
                    }
                });
            }, 1500);
        }
    });
    
    // Enhanced coffee sparkles effect
    function createCoffeeSparkles() {
        const colors = ['#FFD700', '#FFEB3B', '#FFC107', '#FF9800', '#FFFFFF'];
        const coffeeCup = document.querySelector('.coffee-cup-3d');
        const rect = coffeeCup.getBoundingClientRect();
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.classList.add('gift-sparkle');
                
                // Position around the coffee cup
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 80;
                const top = rect.top + rect.height/2 + Math.sin(angle) * distance;
                const left = rect.left + rect.width/2 + Math.cos(angle) * distance;
                
                sparkle.style.top = `${top}px`;
                sparkle.style.left = `${left}px`;
                sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(sparkle);
                
                // Animate the sparkle
                anime({
                    targets: sparkle,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0],
                    easing: 'easeOutExpo',
                    duration: Math.random() * 1500 + 500,
                    complete: function() {
                        sparkle.remove();
                    }
                });
            }, i * 50);
        }
    }
    
    // Enhanced countdown timer with better animation
    function updateCountdown() {
        const now = new Date();
        // Set to May 15th of current year
        const birthdayDate = new Date(now.getFullYear(), 4, 15); // Month is 0-indexed, so 4 = May
        
        // If birthday has already passed this year, set for next year
        if (now > birthdayDate) {
            birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
        }
        
        const diff = birthdayDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Display the countdown with animation for changing values
        const elements = {
            days: {el: document.getElementById('days'), value: days},
            hours: {el: document.getElementById('hours'), value: hours},
            minutes: {el: document.getElementById('minutes'), value: minutes},
            seconds: {el: document.getElementById('seconds'), value: seconds}
        };
        
        Object.keys(elements).forEach(key => {
            const item = elements[key];
            const currentValue = item.el.textContent;
            const newValue = item.value.toString().padStart(2, '0');
            
            if (currentValue !== newValue) {
                // Flash animation for changing values
                gsap.to(item.el, {
                    opacity: 0.5,
                    yoyo: true,
                    duration: 0.2,
                    repeat: 1,
                    onComplete: () => {
                        item.el.textContent = newValue;
                    }
                });
            } else {
                item.el.textContent = newValue;
            }
        });
        
        // If today is the birthday
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            showMessage("Happy Birthday Today! 🎉🎂", 5000);
            createConfetti();
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Enhanced confetti animation
    function createConfetti() {
        const colors = ['#ff6b9d', '#a65af1', '#ffd0e0', '#ffb366', '#66a3ff', '#gold', '#silver'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `-10px`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Random shape
            const shape = Math.floor(Math.random() * 4);
            if (shape === 0) { // Circle
                confetti.style.borderRadius = '50%';
            } else if (shape === 1) { // Rectangle
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 6 + 3}px`;
            } else if (shape === 2) { // Triangle
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${Math.random() * 10 + 5}px solid transparent`;
                confetti.style.borderRight = `${Math.random() * 10 + 5}px solid transparent`;
                confetti.style.borderBottom = `${Math.random() * 10 + 5}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
            } else { // Star
                confetti.style.backgroundColor = 'transparent';
                confetti.innerHTML = '★';
                confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.fontSize = `${Math.random() * 15 + 10}px`;
            }
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                y: `${window.innerHeight + 100}px`,
                x: `${(Math.random() - 0.5) * 300}px`,
                rotation: `${Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1)}deg`,
                duration: Math.random() * 3 + 2,
                ease: "power1.out",
                delay: Math.random() * 3,
                onComplete: function() {
                    confetti.remove();
                }
            });
        }
    }
    
    // Enhanced message bubble with better animation
    function showMessage(text, duration = 3000) {
        const messageBubble = document.getElementById('messageBubble');
        messageBubble.textContent = text;
        messageBubble.classList.add('show');
        
        // Add bounce animation
        gsap.from(messageBubble, {
            y: 20,
            scale: 0.8,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
        
        setTimeout(() => {
            gsap.to(messageBubble, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    messageBubble.classList.remove('show');
                    messageBubble.style.opacity = ''; // Reset inline style
                    messageBubble.style.transform = ''; // Reset inline transform
                }
            });
        }, duration);
    }
    
    // Enhanced bubbles effect
    function createBubbles() {
        const bubbleContainer = document.getElementById('bubbleContainer');
        const bubbleSizes = [30, 40, 50, 60, 70];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                // Random properties
                const size = bubbleSizes[Math.floor(Math.random() * bubbleSizes.length)];
                const translateX = Math.random() * 200 - 100;
                
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 100}vw`;
                bubble.style.setProperty('--translate-x', `${translateX}px`);
                
                bubbleContainer.appendChild(bubble);
                
                // Add animation
                anime({
                    targets: bubble,
                    translateY: -window.innerHeight - 100,
                    translateX: translateX,
                    opacity: [0, 0.7, 0],
                    scale: [0.3, 1],
                    duration: Math.random() * 5000 + 5000,
                    easing: 'easeOutCubic',
                    complete: function() {
                        bubble.remove();
                    }
                });
            }, i * 300);
        }
    }
    
    // Enhanced snowfall effect
    function createSnowfall() {
        const icons = ['❄', '✨', '❅', '❆', '⚡', '💕', '💖'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                snowflake.textContent = icons[Math.floor(Math.random() * icons.length)];
                
                // Random properties
                const size = Math.random() * 15 + 8;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 10 + 5;
                
                snowflake.style.left = `${left}vw`;
                snowflake.style.fontSize = `${size}px`;
                snowflake.style.animationDuration = `${animationDuration}s`;
                
                document.body.appendChild(snowflake);
                
                // Remove snowflake after animation completes
                setTimeout(() => {
                    snowflake.remove();
                }, animationDuration * 1000);
            }, i * 200);
        }
    }
    
    // Enhanced balloon animation
    function createBalloon() {
        const colors = ['#ff6b9d', '#a65af1', '#ffd0e0', '#ffb366', '#66a3ff'];
        
        const balloonContainer = document.createElement('div');
        balloonContainer.classList.add('balloon-container');
        balloonContainer.style.left = `${Math.random() * 80 + 10}vw`;
        
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.setProperty('--rotate-degree', `${Math.random() * 30 - 15}deg`);
        
        // Add balloon knot
        const knot = document.createElement('div');
        knot.classList.add('balloon-knot');
        
        balloonContainer.appendChild(balloon);
        balloonContainer.appendChild(knot);
        document.body.appendChild(balloonContainer);
        
        // Show balloon with a fade in
        setTimeout(() => {
            balloonContainer.style.opacity = '1';
        }, 100);
        
        // Add a slight swaying animation
        gsap.to(balloon, {
            x: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Remove balloon when animation completes
        setTimeout(() => {
            balloonContainer.remove();
        }, 15000);
    }
    
    // Periodically release balloons
    setInterval(createBalloon, 8000);
    
    // Occasionally create snowfall effect
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            createSnowfall();
        }
    }, 25000);
    
    // Enhanced toggle dark mode
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        
        // Play toggle sound
        const toggleSound = new Howl({
            src: ['https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/word-audio/switch.mp3'],
            volume: 0.3
        });
        toggleSound.play();
        
        // Show message when theme changes
        if (document.body.classList.contains('dark-mode')) {
            showMessage("Night mode enabled 🌙", 2000);
        } else {
            showMessage("Day mode enabled ☀️", 2000);
        }
    });
    
    // Handle window resize smoothly
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Refresh particles on resize for better performance
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                window.particlesJS('particles-js', window.pJSDom[0].pJS.params);
            }
        }, 250);
    });
    
    // Make photos clickable with enhanced interaction
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Play camera sound
            const cameraSound = new Howl({
                src: ['https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/word-audio/camera.mp3'],
                volume: 0.3
            });
            cameraSound.play();
            
            // Show different messages for each photo
            const messages = [
                "Add your favorite photo here 📸",
                "Remember our trip? Add that photo here 🏖️",
                "Our first selfie would look great here 🤳",
                "Add that funny photo of us here 😄",
                "This space is waiting for a special memory 💖",
                "Capture our best moment here 📱"
            ];
            
            showMessage(messages[index % messages.length], 3000);
            
            // Flash effect
            gsap.to(item, {
                boxShadow: "0 0 0 3px rgba(255,255,255,1)",
                duration: 0.1,
                repeat: 1,
                yoyo: true,
                onComplete: () => {
                    item.style.boxShadow = "";
                }
            });
        });
    });
    
    // Add Easter eggs
    document.addEventListener('keydown', function(e) {
        // Press 'B' for balloons
        if (e.key.toLowerCase() === 'b') {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createBalloon(), i * 300);
            }
            showMessage("Balloons for your birthday! 🎈", 2000);
        }
        
        // Press 'C' for confetti
        if (e.key.toLowerCase() === 'c') {
            createConfetti();
            showMessage("Confetti celebration! 🎉", 2000);
        }
        
        // Press 'H' for hearts
        if (e.key.toLowerCase() === 'h') {
            animateHearts();
            showMessage("Hearts for you! ❤️", 2000);
        }
        
        // Press 'S' for snow
        if (e.key.toLowerCase() === 's') {
            createSnowfall();
            showMessage("Special sparkles! ✨", 2000);
        }
    });
});