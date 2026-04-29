document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active section
            sections.forEach(sec => {
                sec.classList.remove('active-section');
                if (sec.id === targetId) {
                    sec.classList.add('active-section');
                }
            });
        });
    });

    // --- Simulation Logic ---
    const organData = {
        mouth: {
            title: "Mouth (Buccal Cavity)",
            enzyme: "Salivary Amylase",
            process: "Ingestion & Digestion",
            desc: "The mouth is the beginning of the digestive tract. Chewing breaks the food into pieces that are more easily digested, while saliva mixes with food to begin the process of breaking it down into a form your body can absorb and use.",
            tip: "Remember that digestion of carbohydrates (starch) begins in the mouth, NOT the stomach!"
        },
        esophagus: {
            title: "Esophagus",
            enzyme: "None",
            process: "Peristalsis",
            desc: "A muscular tube connecting the throat (pharynx) with the stomach. The esophagus delivers food to the stomach through a series of rhythmic muscle contractions called peristalsis.",
            tip: "Peristalsis occurs throughout the gut. There is no digestion here."
        },
        stomach: {
            title: "Stomach",
            enzyme: "Pepsin & Gastric Lipase",
            process: "Digestion",
            desc: "A hollow organ that holds food while it is being mixed with stomach enzymes and acid (HCl). The acid provides the optimal pH for pepsin to digest proteins.",
            tip: "Mucus protects the stomach lining from the corrosive action of HCl. HCl also kills bacteria in food."
        },
        liver: {
            title: "Liver",
            enzyme: "Bile Juice (No Enzymes)",
            process: "Emulsification",
            desc: "The liver produces bile, which is stored in the gallbladder. Bile emulsifies fats (breaks down large fat globules into smaller micelles), making it easier for lipase to act upon them.",
            tip: "Bile contains NO enzymes but is essential for fat digestion and making the medium alkaline."
        },
        pancreas: {
            title: "Pancreas",
            enzyme: "Trypsin, Lipase, Amylase",
            process: "Digestion",
            desc: "Secretes pancreatic juice containing enzymes into the small intestine. Trypsin digests proteins, lipase digests emulsified fats, and amylase digests starch.",
            tip: "Trypsin digests proteins in an ALKALINE medium, unlike pepsin which needs an ACIDIC medium."
        },
        "small-intestine": {
            title: "Small Intestine",
            enzyme: "Intestinal Enzymes",
            process: "Absorption",
            desc: "The site of complete digestion of carbohydrates, proteins, and fats. The inner lining has numerous finger-like projections called villi which increase the surface area for absorption of digested food into the blood.",
            tip: "Villi are richly supplied with blood vessels to transport absorbed food. This is a very frequent 3-mark question!"
        },
        "large-intestine": {
            title: "Large Intestine",
            enzyme: "None",
            process: "Water Absorption",
            desc: "Absorbs water and electrolytes from the remaining indigestible food matter and transmits the useless waste material from the body as feces.",
            tip: "No significant digestion occurs here. Its main function is water absorption."
        }
    };

    const organs = document.querySelectorAll('.organ');
    const simPlaceholder = document.querySelector('.sim-placeholder');
    const simDetails = document.getElementById('sim-details');
    const oTitle = document.getElementById('organ-title');
    const oEnzyme = document.getElementById('organ-enzyme');
    const oProcess = document.getElementById('organ-process');
    const oDesc = document.getElementById('organ-desc');
    const oTip = document.getElementById('organ-tip');

    organs.forEach(organ => {
        organ.addEventListener('click', () => {
            // Remove active class from all
            organs.forEach(o => o.classList.remove('active-organ'));
            // Add to clicked
            organ.classList.add('active-organ');

            const organKey = organ.getAttribute('data-organ');
            const data = organData[organKey];

            // Update UI
            simPlaceholder.classList.add('hidden');
            simDetails.classList.remove('hidden');
            
            oTitle.textContent = data.title;
            oEnzyme.textContent = data.enzyme;
            oProcess.textContent = data.process;
            oDesc.textContent = data.desc;
            oTip.textContent = data.tip;
        });
    });

    // --- Quiz Logic ---
    const quizData = [
        {
            question: "Which of the following is an incorrect statement about autotrophs?",
            options: [
                "They synthesize carbohydrates from carbon dioxide and water.",
                "They store carbohydrates in the form of starch.",
                "They convert carbon dioxide and water into carbohydrates in the absence of sunlight.",
                "They constitute the first trophic level in food chains."
            ],
            correct: 2,
            reason: "Autotrophs require sunlight (photons) to convert CO2 and H2O into carbohydrates (photosynthesis)."
        },
        {
            question: "In which part of the alimentary canal is food finally digested?",
            options: ["Stomach", "Mouth cavity", "Large intestine", "Small intestine"],
            correct: 3,
            reason: "The small intestine receives secretions from the liver and pancreas and completes the digestion of proteins, carbohydrates, and fats."
        },
        {
            question: "Assertion (A): The walls of the ventricle are thicker than the atria.<br>Reason (R): Ventricles have to pump blood to various organs with high pressure.",
            options: [
                "Both A and R are true and R is the correct explanation of A.",
                "Both A and R are true but R is not the correct explanation of A.",
                "A is true but R is false.",
                "A is false but R is true."
            ],
            correct: 0,
            reason: "Because ventricles pump blood out to the lungs and the rest of the body, they require thicker, more muscular walls to generate high pressure."
        },
        {
            question: "What is the correct sequence of air passage during inhalation?",
            options: [
                "Nostrils → Larynx → Pharynx → Trachea → Lungs",
                "Nasal passage → Trachea → Pharynx → Larynx → Alveoli",
                "Larynx → Nostrils → Pharynx → Lungs",
                "Nostrils → Pharynx → Larynx → Trachea → Alveoli"
            ],
            correct: 3,
            reason: "Air enters through nostrils, passes through the pharynx (throat), larynx (voice box), down the trachea (windpipe), into bronchi and finally alveoli."
        },
        {
            question: "Which plant hormone promotes cell division?",
            options: ["Auxin", "Gibberellin", "Cytokinin", "Abscisic acid"],
            correct: 2,
            reason: "Cytokinins promote cell division and are present in greater concentration in areas of rapid cell division, such as in fruits and seeds."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizStartDiv = document.getElementById('quiz-start');
    const quizActiveDiv = document.getElementById('quiz-active');
    const quizResultDiv = document.getElementById('quiz-result');
    
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const qTracker = document.getElementById('question-tracker');
    const scoreTracker = document.getElementById('score-tracker');
    const nextBtn = document.getElementById('next-btn');
    const feedbackMsg = document.getElementById('feedback-msg');
    const progressBar = document.getElementById('quiz-progress');

    startQuizBtn.addEventListener('click', () => {
        quizStartDiv.classList.add('hidden');
        quizActiveDiv.classList.remove('hidden');
        loadQuestion();
    });

    function loadQuestion() {
        const qData = quizData[currentQuestionIndex];
        qText.innerHTML = qData.question;
        optionsContainer.innerHTML = '';
        feedbackMsg.classList.add('hidden');
        feedbackMsg.textContent = '';
        nextBtn.classList.add('hidden');

        // Update Trackers
        qTracker.textContent = `Q: ${currentQuestionIndex + 1}/${quizData.length}`;
        scoreTracker.textContent = `Score: ${score}`;
        progressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerHTML = opt;
            btn.addEventListener('click', () => selectOption(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, selectedBtn) {
        const qData = quizData[currentQuestionIndex];
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        // Disable all buttons
        allBtns.forEach(btn => btn.disabled = true);

        if (selectedIndex === qData.correct) {
            selectedBtn.classList.add('correct');
            score++;
            scoreTracker.textContent = `Score: ${score}`;
            feedbackMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Correct! ${qData.reason}`;
            feedbackMsg.className = 'feedback-correct';
        } else {
            selectedBtn.classList.add('wrong');
            allBtns[qData.correct].classList.add('correct'); // Show correct answer
            feedbackMsg.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Incorrect. ${qData.reason}`;
            feedbackMsg.className = 'feedback-wrong';
        }

        feedbackMsg.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizActiveDiv.classList.add('hidden');
        quizResultDiv.classList.remove('hidden');
        progressBar.style.width = '100%';
        
        document.getElementById('final-score').textContent = `${score}/${quizData.length}`;
        const msg = document.getElementById('result-message');
        if (score === quizData.length) {
            msg.textContent = "Outstanding! You are fully prepared for the boards.";
        } else if (score >= quizData.length / 2) {
            msg.textContent = "Good job! Review the concepts you missed to score 100/100.";
        } else {
            msg.textContent = "Keep practicing. Make sure to read the NCERT carefully.";
        }
    }

    document.getElementById('restart-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        quizResultDiv.classList.add('hidden');
        quizActiveDiv.classList.remove('hidden');
        loadQuestion();
    });

    // --- Worksheet Logic ---
    const showAnsBtns = document.querySelectorAll('.show-ans-btn');
    showAnsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const answerDiv = e.target.nextElementSibling;
            if (answerDiv.classList.contains('hidden')) {
                answerDiv.classList.remove('hidden');
                e.target.textContent = "Hide Ideal Answer";
            } else {
                answerDiv.classList.add('hidden');
                e.target.textContent = "Reveal Ideal Answer";
            }
        });
    });

    // --- Question Bank Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const qCards = document.querySelectorAll('.q-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            qCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-marks') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    const toggleAnsBtns = document.querySelectorAll('.toggle-ans');
    toggleAnsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ansDiv = e.target.nextElementSibling;
            if (ansDiv.classList.contains('hidden')) {
                ansDiv.classList.remove('hidden');
                e.target.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Answer';
            } else {
                ansDiv.classList.add('hidden');
                e.target.innerHTML = '<i class="fa-solid fa-eye"></i> View Answer';
            }
        });
    });

});
