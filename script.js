/* =========================================================
   FUNCTIONS STUDY PORTAL
   Vanilla JavaScript
========================================================= */


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [...document.querySelectorAll(selector)];


/* Convert comma-separated text into an array */
function parseValues(value) {

    return value
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");
}


/* Remove duplicate values */
function uniqueValues(array) {

    return [...new Set(array)];
}


/* Format array as a mathematical set */
function formatSet(array) {

    if (!array || array.length === 0) {
        return "∅";
    }

    return `{ ${array.join(", ")} }`;
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    $$("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = $("#themeToggle");

const savedTheme = localStorage.getItem("functionsTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "functionsTheme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================================================
   PRINT
========================================================= */

const printBtn = $("#printBtn");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        window.print();

    });

}


/* =========================================================
   READING PROGRESS
========================================================= */

const readingProgress = $("#readingProgress");

function updateReadingProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (readingProgress) {

        readingProgress.style.width =
            `${progress}%`;

    }

}

window.addEventListener(
    "scroll",
    updateReadingProgress,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop = $("#backToTop");

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    },
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   FUNCTION QUIZ
========================================================= */

const functionQuestions = [

    {
        relation: "{(1,a), (2,b), (3,c)}",
        answer: "yes",
        explanation:
            "Every input appears exactly once and has exactly one output."
    },

    {
        relation: "{(1,a), (1,b), (2,c)}",
        answer: "no",
        explanation:
            "Input 1 has two different outputs, a and b. Therefore it is not a function."
    },

    {
        relation: "{(1,a), (2,a), (3,b)}",
        answer: "yes",
        explanation:
            "Different inputs may have the same output. A function only requires one output per input."
    },

    {
        relation: "{(1,a), (2,b), (2,c), (3,d)}",
        answer: "no",
        explanation:
            "Input 2 has two outputs, b and c."
    },

    {
        relation: "{(1,x), (2,y), (3,y), (4,z)}",
        answer: "yes",
        explanation:
            "Every input has exactly one output, so this is a function."
    }

];

let currentFunctionQuestion = 0;

function loadFunctionQuestion() {

    const question =
        functionQuestions[currentFunctionQuestion];

    const questionBox =
        $("#functionQuizQuestion");

    if (questionBox) {

        questionBox.textContent =
            question.relation;

    }

    const feedback =
        $("#functionQuizFeedback");

    if (feedback) {

        feedback.textContent = "";

    }

}


$$(".function-answer").forEach(button => {

    button.addEventListener("click", () => {

        const selected =
            button.dataset.answer;

        const question =
            functionQuestions[currentFunctionQuestion];

        const feedback =
            $("#functionQuizFeedback");

        if (selected === question.answer) {

            feedback.textContent =
                "✓ Correct! " + question.explanation;

            feedback.style.color =
                "var(--success)";

        } else {

            feedback.textContent =
                "✕ Not quite. " + question.explanation;

            feedback.style.color =
                "var(--danger)";

        }

    });

});


const newFunctionQuestion =
    $("#newFunctionQuestion");

if (newFunctionQuestion) {

    newFunctionQuestion.addEventListener(
        "click",
        () => {

            currentFunctionQuestion =
                (currentFunctionQuestion + 1) %
                functionQuestions.length;

            loadFunctionQuestion();

        }
    );

}


/* =========================================================
   DOMAIN & RANGE EXPLORER
========================================================= */

const calculateDomainRange =
    $("#calculateDomainRange");


function calculateFunctionValue(
    value,
    functionType
) {

    switch (functionType) {

        case "square":
            return value * value;

        case "linear":
            return 2 * value + 1;

        case "cube":
            return value ** 3;

        case "double":
            return 2 * value;

        case "plus5":
            return value + 5;

        default:
            return value;

    }

}


if (calculateDomainRange) {

    calculateDomainRange.addEventListener(
        "click",
        () => {

            const raw =
                parseValues(
                    $("#domainInput").value
                );

            const functionType =
                $("#domainFunction").value;

            if (raw.length === 0) {

                alert("Please enter domain values.");

                return;

            }

            const numericValues =
                raw.map(Number);

            if (
                numericValues.some(
                    value => Number.isNaN(value)
                )
            ) {

                alert(
                    "Please enter only numeric values separated by commas."
                );

                return;

            }

            const range =
                uniqueValues(
                    numericValues.map(
                        value =>
                            calculateFunctionValue(
                                value,
                                functionType
                            )
                    )
                );

            const result =
                $("#domainRangeResult");

            result.classList.add("show");

            result.innerHTML = `

                <strong>Domain:</strong>
                ${formatSet(numericValues)}

                <br><br>

                <strong>Range:</strong>
                ${formatSet(range)}

                <br><br>

                <strong>Observation:</strong>
                The range contains the actual outputs produced
                from the given domain.

            `;

        }
    );

}


/* =========================================================
   FUNCTION CLASSIFICATION
========================================================= */

const classifyFunction =
    $("#classifyFunction");


if (classifyFunction) {

    classifyFunction.addEventListener(
        "click",
        () => {

            const domain =
                uniqueValues(
                    parseValues(
                        $("#classDomain").value
                    )
                );

            const codomain =
                uniqueValues(
                    parseValues(
                        $("#classCodomain").value
                    )
                );

            const outputs =
                parseValues(
                    $("#classOutputs").value
                );

            const result =
                $("#classificationResult");

            result.classList.add("show");

            if (domain.length === 0) {

                result.innerHTML =
                    "Please enter a domain.";

                return;

            }

            if (outputs.length !== domain.length) {

                result.innerHTML = `
                    <strong>Invalid mapping.</strong><br>
                    You entered ${outputs.length} outputs for
                    ${domain.length} domain elements.
                    Every domain element needs exactly one output.
                `;

                result.classList.add("result-warning");

                return;

            }

            const outputSet =
                uniqueValues(outputs);

            const repeatedOutput =
                outputSet.length <
                outputs.length;

            const allOutputsInCodomain =
                outputs.every(
                    value =>
                        codomain.includes(value)
                );

            const everyCodomainReached =
                codomain.every(
                    value =>
                        outputSet.includes(value)
                );

            if (!allOutputsInCodomain) {

                result.innerHTML = `
                    <strong>Check the codomain.</strong><br>
                    At least one output is not present in the specified codomain.
                `;

                result.classList.add("result-warning");

                return;

            }

            const injective =
                !repeatedOutput;

            const surjective =
                everyCodomainReached;

            let classification = "";

            if (injective && surjective) {

                classification =
                    "Bijective";

            } else if (injective) {

                classification =
                    "Injective but not Surjective";

            } else if (surjective) {

                classification =
                    "Surjective but not Injective";

            } else {

                classification =
                    "Neither Injective nor Surjective";

            }

            result.classList.remove(
                "result-warning"
            );

            result.classList.add(
                "result-success"
            );

            result.innerHTML = `

                <strong>Classification: ${classification}</strong>

                <br><br>

                <strong>Injective:</strong>
                ${injective ? "Yes" : "No"}

                <br>

                <strong>Surjective:</strong>
                ${surjective ? "Yes" : "No"}

                <br><br>

                <strong>Range:</strong>
                ${formatSet(outputSet)}

                <br><br>

                <strong>Reason:</strong>
                ${
                    injective
                        ? "No output is repeated."
                        : "At least two different inputs share an output."
                }

                ${
                    surjective
                        ? " Every codomain element is reached."
                        : " At least one codomain element is not reached."
                }

            `;

        }
    );

}


/* =========================================================
   COMPOSITION CALCULATOR
========================================================= */

const compositionF =
    $("#compositionF");

const compositionG =
    $("#compositionG");

const calculateComposition =
    $("#calculateComposition");


function evaluateLinear(
    expression,
    x
) {

    switch (expression) {

        case "2x+1":
            return 2 * x + 1;

        case "3x-2":
            return 3 * x - 2;

        case "x+5":
            return x + 5;

        default:
            return x;

    }

}


function evaluateG(
    expression,
    x
) {

    switch (expression) {

        case "x2":
            return x * x;

        case "x+2":
            return x + 2;

        case "2x":
            return 2 * x;

        default:
            return x;

    }

}


function functionLabelF(expression) {

    const labels = {

        "2x+1": "2x + 1",
        "3x-2": "3x − 2",
        "x+5": "x + 5"

    };

    return labels[expression];

}


function functionLabelG(expression) {

    const labels = {

        "x2": "x²",
        "x+2": "x + 2",
        "2x": "2x"

    };

    return labels[expression];

}


if (calculateComposition) {

    calculateComposition.addEventListener(
        "click",
        () => {

            const f =
                compositionF.value;

            const g =
                compositionG.value;

            /*
                We demonstrate the composition
                using x = 2 as an easy numerical check.
            */

            const x = 2;

            const gx =
                evaluateG(g, x);

            const fOfG =
                evaluateLinear(f, gx);

            const fx =
                evaluateLinear(f, x);

            const gOfF =
                evaluateG(g, fx);

            const result =
                $("#compositionResult");

            result.classList.add("show");

            result.innerHTML = `

                <strong>f(x) = ${functionLabelF(f)}</strong>

                <br>

                <strong>g(x) = ${functionLabelG(g)}</strong>

                <hr>

                <strong>(f ∘ g)(x):</strong>

                Apply g first, then f.

                <br>

                At x = 2:

                g(2) = ${gx}

                <br>

                f(g(2)) = ${fOfG}

                <br><br>

                <strong>(g ∘ f)(x):</strong>

                Apply f first, then g.

                <br>

                f(2) = ${fx}

                <br>

                g(f(2)) = ${gOfF}

                <br><br>

                <strong>Numerical comparison at x = 2:</strong>

                ${fOfG} vs ${gOfF}

                <br><br>

                <em>
                Remember: (f ∘ g)(x) = f(g(x)).
                </em>

            `;

        }
    );

}


/* =========================================================
   INVERSE FUNCTION CALCULATOR
========================================================= */

const calculateInverse =
    $("#calculateInverse");


if (calculateInverse) {

    calculateInverse.addEventListener(
        "click",
        () => {

            const a =
                Number(
                    $("#inverseA").value
                );

            const b =
                Number(
                    $("#inverseB").value
                );

            const result =
                $("#inverseResult");

            result.classList.add("show");

            if (a === 0 || Number.isNaN(a)) {

                result.classList.add(
                    "result-warning"
                );

                result.innerHTML =
                    "The coefficient a cannot be zero for a linear inverse of ax + b.";

                return;

            }

            const sign =
                b >= 0
                    ? `+ ${b}`
                    : `− ${Math.abs(b)}`;

            result.classList.remove(
                "result-warning"
            );

            result.innerHTML = `

                <strong>Given:</strong>

                f(x) = ${a}x ${sign}

                <br><br>

                <strong>Step 1:</strong>

                y = ${a}x ${sign}

                <br><br>

                <strong>Step 2: Interchange x and y</strong>

                <br>

                x = ${a}y ${sign}

                <br><br>

                <strong>Step 3: Solve for y</strong>

                <br>

                ${a}y = x ${b >= 0 ? "−" : "+"} ${Math.abs(b)}

                <br>

                y =
                (x ${b >= 0 ? "−" : "+"} ${Math.abs(b)})
                / ${a}

                <br><br>

                <strong>Therefore:</strong>

                <div class="formula">
                    f⁻¹(x) =
                    (x ${b >= 0 ? "−" : "+"} ${Math.abs(b)})
                    / ${a}
                </div>

            `;

        }
    );

}


/* =========================================================
   FLOOR / CEILING CALCULATOR
========================================================= */

const calculateFloor =
    $("#calculateFloor");


if (calculateFloor) {

    calculateFloor.addEventListener(
        "click",
        () => {

            const value =
                Number(
                    $("#floorInput").value
                );

            const result =
                $("#floorResult");

            result.classList.add("show");

            if (Number.isNaN(value)) {

                result.innerHTML =
                    "Please enter a valid number.";

                return;

            }

            result.innerHTML = `

                <strong>Number:</strong> ${value}

                <br><br>

                <strong>Floor:</strong>

                ⌊${value}⌋ = ${Math.floor(value)}

                <br>

                <strong>Ceiling:</strong>

                ⌈${value}⌉ = ${Math.ceil(value)}

                <br><br>

                <span style="color:var(--muted)">
                    Floor moves to the greatest integer ≤ x.
                    Ceiling moves to the smallest integer ≥ x.
                </span>

            `;

        }
    );

}


/* =========================================================
   FLASHCARD DATA
========================================================= */

const flashcards = [

    {
        category: "basics",
        question: "What is a function?",
        answer: "A relation where every input has exactly one output.",
        hint: "Remember: one input → exactly one output."
    },

    {
        category: "basics",
        question: "What does f : A → B mean?",
        answer: "f maps every element of A to exactly one element of B.",
        hint: "A is the domain and B is the codomain."
    },

    {
        category: "domain",
        question: "What is the domain?",
        answer: "The set of all allowed input values.",
        hint: "Domain = inputs."
    },

    {
        category: "domain",
        question: "What is the codomain?",
        answer: "The specified set containing possible target values.",
        hint: "It is written after the arrow in f : A → B."
    },

    {
        category: "domain",
        question: "What is the range?",
        answer: "The set of output values actually produced.",
        hint: "Range is always a subset of the codomain."
    },

    {
        category: "domain",
        question: "How are range and codomain related?",
        answer: "Range is a subset of the codomain.",
        hint: "Range may not cover the whole codomain."
    },

    {
        category: "types",
        question: "What is an injective function?",
        answer: "Different inputs always have different outputs.",
        hint: "One-to-one."
    },

    {
        category: "types",
        question: "State the injective condition.",
        answer: "f(a) = f(b) implies a = b.",
        hint: "No two distinct inputs share an output."
    },

    {
        category: "types",
        question: "What is a surjective function?",
        answer: "Every codomain element is reached by at least one input.",
        hint: "Onto means Range = Codomain."
    },

    {
        category: "types",
        question: "What is a bijective function?",
        answer: "A function that is both injective and surjective.",
        hint: "One-to-one + onto."
    },

    {
        category: "types",
        question: "What is a many-to-one function?",
        answer: "Different inputs may have the same output.",
        hint: "Repeated outputs are allowed."
    },

    {
        category: "types",
        question: "What is an identity function?",
        answer: "A function defined by f(x) = x.",
        hint: "Every element maps to itself."
    },

    {
        category: "composition",
        question: "What is (f ∘ g)(x)?",
        answer: "f(g(x)); apply g first, then f.",
        hint: "Rightmost function acts first."
    },

    {
        category: "composition",
        question: "Is f ∘ g always equal to g ∘ f?",
        answer: "No. Function composition is generally not commutative.",
        hint: "Order matters."
    },

    {
        category: "composition",
        question: "What is the first step in f ∘ g?",
        answer: "Apply g to the input.",
        hint: "Read from the right."
    },

    {
        category: "inverse",
        question: "What does f⁻¹ represent?",
        answer: "The inverse function that reverses f.",
        hint: "It is not the reciprocal."
    },

    {
        category: "inverse",
        question: "Does f⁻¹(x) mean 1/f(x)?",
        answer: "No. f⁻¹ is inverse; 1/f(x) is the reciprocal.",
        hint: "Different notation, different meaning."
    },

    {
        category: "inverse",
        question: "What condition usually guarantees an inverse function?",
        answer: "The function is bijective between the specified sets.",
        hint: "The mapping must be reversible."
    },

    {
        category: "inverse",
        question: "How do you find an inverse?",
        answer: "Write y=f(x), swap x and y, then solve for y.",
        hint: "Swap and solve."
    },

    {
        category: "inverse",
        question: "How can an inverse be verified?",
        answer: "Check f(f⁻¹(x)) = x and f⁻¹(f(x)) = x.",
        hint: "The two functions undo each other."
    },

    {
        category: "cs",
        question: "What is an exponential function?",
        answer: "A function such as f(x)=aˣ where the variable is in the exponent.",
        hint: "Think powers."
    },

    {
        category: "cs",
        question: "What is log₂ 8?",
        answer: "3, because 2³ = 8.",
        hint: "Log asks for the exponent."
    },

    {
        category: "cs",
        question: "Where is log₂ n common in CS?",
        answer: "Binary search and balanced tree analysis.",
        hint: "Repeatedly dividing by 2."
    },

    {
        category: "cs",
        question: "What is a polynomial function?",
        answer: "A function made from non-negative integer powers of x.",
        hint: "Example: x² + 3x + 2."
    },

    {
        category: "floor",
        question: "What is ⌊3.7⌋?",
        answer: "3.",
        hint: "Greatest integer ≤ 3.7."
    },

    {
        category: "floor",
        question: "What is ⌈3.2⌉?",
        answer: "4.",
        hint: "Smallest integer ≥ 3.2."
    },

    {
        category: "floor",
        question: "What is ⌊−2.3⌋?",
        answer: "−3.",
        hint: "Floor moves toward the smaller integer."
    },

    {
        category: "floor",
        question: "What is ⌈−2.3⌉?",
        answer: "−2.",
        hint: "Ceiling moves toward the larger integer."
    }

];


let filteredFlashcards =
    [...flashcards];

let flashcardIndex = 0;

let shuffledMode = false;


const flashcard =
    $("#flashcard");

const flashcardQuestion =
    $("#flashcardQuestion");

const flashcardAnswer =
    $("#flashcardAnswer");

const flashcardHint =
    $("#flashcardHint");

const flashcardCount =
    $("#flashcardCount");

const flashcardCategoryLabel =
    $("#flashcardCategoryLabel");


/* =========================================================
   FLASHCARD RENDER
========================================================= */

function renderFlashcard() {

    if (
        !filteredFlashcards.length ||
        !flashcardQuestion
    ) {
        return;
    }

    const card =
        filteredFlashcards[flashcardIndex];

    flashcardQuestion.textContent =
        card.question;

    flashcardAnswer.textContent =
        card.answer;

    flashcardHint.textContent =
        card.hint;

    flashcardCount.textContent =
        `${flashcardIndex + 1} / ${filteredFlashcards.length}`;

    const category =
        card.category;

    const labels = {

        basics: "Basics",
        domain: "Domain & Range",
        types: "Types",
        composition: "Composition",
        inverse: "Inverse",
        cs: "CS Functions",
        floor: "Floor & Ceiling"

    };

    flashcardCategoryLabel.textContent =
        labels[category] || "All Topics";

    flashcard.classList.remove(
        "is-flipped"
    );

}


/* =========================================================
   FLASHCARD CATEGORY
========================================================= */

const flashcardCategory =
    $("#flashcardCategory");


if (flashcardCategory) {

    flashcardCategory.addEventListener(
        "change",
        () => {

            const category =
                flashcardCategory.value;

            if (category === "all") {

                filteredFlashcards =
                    [...flashcards];

            } else {

                filteredFlashcards =
                    flashcards.filter(
                        card =>
                            card.category === category
                    );

            }

            flashcardIndex = 0;

            renderFlashcard();

        }
    );

}


/* =========================================================
   FLASHCARD FLIP
========================================================= */

function flipFlashcard() {

    flashcard.classList.toggle(
        "is-flipped"
    );

}


if (flashcard) {

    flashcard.addEventListener(
        "click",
        flipFlashcard
    );

}


const flipCard =
    $("#flipCard");

if (flipCard) {

    flipCard.addEventListener(
        "click",
        flipFlashcard
    );

}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

const nextCard =
    $("#nextCard");

const previousCard =
    $("#previousCard");


if (nextCard) {

    nextCard.addEventListener(
        "click",
        () => {

            if (!filteredFlashcards.length) {
                return;
            }

            flashcardIndex =
                (flashcardIndex + 1) %
                filteredFlashcards.length;

            renderFlashcard();

        }
    );

}


if (previousCard) {

    previousCard.addEventListener(
        "click",
        () => {

            if (!filteredFlashcards.length) {
                return;
            }

            flashcardIndex =
                (flashcardIndex - 1 +
                filteredFlashcards.length) %
                filteredFlashcards.length;

            renderFlashcard();

        }
    );

}


/* =========================================================
   SHUFFLE FLASHCARDS
========================================================= */

const shuffleCards =
    $("#shuffleCards");


if (shuffleCards) {

    shuffleCards.addEventListener(
        "click",
        () => {

            for (
                let i = filteredFlashcards.length - 1;
                i > 0;
                i--
            ) {

                const j =
                    Math.floor(
                        Math.random() * (i + 1)
                    );

                [
                    filteredFlashcards[i],
                    filteredFlashcards[j]
                ] =
                [
                    filteredFlashcards[j],
                    filteredFlashcards[i]
                ];

            }

            flashcardIndex = 0;

            shuffledMode = true;

            renderFlashcard();

        }
    );

}


/* =========================================================
   FLASHCARD KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            document.activeElement === flashcard ||
            document.activeElement === document.body
        ) {

            if (event.code === "Space") {

                event.preventDefault();

                flipFlashcard();

            }

            if (event.key === "ArrowRight") {

                event.preventDefault();

                nextCard.click();

            }

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                previousCard.click();

            }

        }

    }
);


/* =========================================================
   ACCORDION
========================================================= */

$$(".accordion-question").forEach(
    question => {

        question.addEventListener(
            "click",
            () => {

                const current =
                    question.parentElement;

                const wasOpen =
                    current.classList.contains(
                        "open"
                    );

                $$(".accordion-item").forEach(
                    item => {

                        item.classList.remove(
                            "open"
                        );

                    }
                );

                if (!wasOpen) {

                    current.classList.add(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   NAV ACTIVE SECTION
========================================================= */

const sections =
    $$("main section[id]");

const navLinks =
    $$("#navMenu a");


function updateActiveNav() {

    let currentId = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 130;

        if (
            window.scrollY >= top
        ) {

            currentId =
                section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentId}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================================
   CHECKLIST PERSISTENCE
========================================================= */

const checklist =
    $$(".final-checklist input[type='checkbox']");

checklist.forEach(
    (checkbox, index) => {

        const saved =
            localStorage.getItem(
                `functionChecklist${index}`
            );

        if (saved === "true") {

            checkbox.checked = true;

        }

        checkbox.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    `functionChecklist${index}`,
                    checkbox.checked
                );

            }
        );

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

loadFunctionQuestion();

renderFlashcard();

updateReadingProgress();

updateActiveNav();

console.log(
    "Functions Study Portal loaded successfully."
);