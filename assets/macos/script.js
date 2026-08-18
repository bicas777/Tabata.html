// =========================
// CLOCK
// =========================

function updateClock() {

    const clock =
        document.getElementById("clock");

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}`;
}


updateClock();


setInterval(
    updateClock,
    1000
);


const dock =
    document.querySelector(".dock");

const menuBar =
    document.querySelector(".menu-bar");

// =========================
// SAFARI
// =========================

const safariWindow =
    document.getElementById(
        "safariWindow"
    );

const safariHeader =
    document.getElementById(
        "safariHeader"
    );

const safariDockItem =
    document.getElementById(
        "safariDockItem"
    );



// =========================
// WINDOW STATE
// =========================

let safariIsOpen = false;

let safariIsAnimating = false;

let highestZIndex = 5000;

const activeAppName =
    document.getElementById(
        "activeAppName"
    );


function setActiveApp(
    appName
) {

    if (
        !activeAppName
    ) {
        return;
    }

    activeAppName.textContent =
        appName;

}


// =========================
// BRING WINDOW TO FRONT
// =========================

function bringToFront(
    windowElement
) {

    // =========================
    // AUMENTAR Z-INDEX
    // =========================

    highestZIndex++;

    windowElement.style.zIndex =
        highestZIndex;


    // =========================
    // ATUALIZAR APP ATIVO
    // =========================

    if (
        windowElement.id ===
        "finderWindow"
    ) {

        setActiveApp(
            "Finder"
        );

        setDockActive(
            "finderDockItem"
        );

    }

    else if (
        windowElement.id ===
        "paintWindow"
    ) {

        setActiveApp(
            "Paint"
        );

        setDockActive(
            "paintDockItem"
        );

    }

    else if (
        windowElement.id ===
        "calculatorWindow"
    ) {

        setActiveApp(
            "Calculadora"
        );

        setDockActive(
            "calculatorDockItem"
        );

    }

    else if (
        windowElement.id ===
        "terminalWindow"
    ) {

        setActiveApp(
            "Terminal"
        );

        setDockActive(
            "terminalDockItem"
        );

    }

    else if (
        windowElement.id ===
        "readmeWindow"
    ) {

        setActiveApp(
            "TextEdit"
        );

        setDockActive(
            "readmeDockItem"
        );

    }

    else if (
        windowElement.id ===
        "imageViewerWindow"
    ) {

        setActiveApp(
            "Visualizador de Imagens"
        );

        setDockActive(
            "imageViewerDockItem"
        );

    }

    else if (
        windowElement.id ===
        "settingsWindow"
    ) {

        setActiveApp(
            "Configurações"
        );

        setDockActive(
            "settingsDockItem"
        );

    }

    else if (
        windowElement.id ===
        "safariWindow"
    ) {

        setActiveApp(
            "Safari"
        );

        setDockActive(
            "safariDockItem"
        );

    }

    else if (
        windowElement.id ===
        "trashWindow"
    ) {

        setActiveApp(
            "Lixeira"
        );

        setDockActive(
            "trashDockItem"
        );

    }

}

// =========================
// GET DOCK POSITION
// =========================

function getSafariDockPosition() {

    const dockRect =
        safariDockItem.getBoundingClientRect();

    const windowRect =
        safariWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}



// =========================
// OPEN SAFARI
// =========================

function openSafari() {

    if (
        safariIsAnimating
    ) {
        return;
    }


    // Se já está aberto,
    // apenas traz para frente

    if (
        safariIsOpen
    ) {

        bringToFront(
            safariWindow
        );

        return;

    }


    safariIsAnimating = true;


    // Mostra a janela

    safariWindow.style.display =
        "flex";


    // Remove estados anteriores

    safariWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // Calcula posição do Dock

    const dockPosition =
        getSafariDockPosition();


    safariWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    safariWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Força reflow

    void safariWindow.offsetWidth;


    // Inicia animação

    safariWindow.classList.add(
        "opening"
    );


    bringToFront(
        safariWindow
    );


    safariIsOpen = true;


    setTimeout(() => {

        safariWindow.classList.remove(
            "opening"
        );

        safariIsAnimating = false;

    }, 450);

}



// =========================
// MINIMIZE SAFARI
// =========================

function minimizeSafari() {

    if (
        !safariIsOpen ||
        safariIsAnimating
    ) {
        return;
    }


    safariIsAnimating = true;


    // Calcula posição do Dock

    const dockPosition =
        getSafariDockPosition();


    safariWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    safariWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Inicia animação

    safariWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        safariWindow.style.display =
            "none";


        safariWindow.classList.remove(
            "minimizing"
        );


        safariIsOpen = false;

        safariIsAnimating = false;

    }, 450);

}



// =========================
// CLOSE SAFARI
// =========================

function closeSafari() {

    if (
        !safariIsOpen ||
        safariIsAnimating
    ) {
        return;
    }


    safariIsAnimating = true;


    safariWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        safariWindow.style.display =
            "none";


        safariWindow.classList.remove(
            "closing"
        );


        safariIsOpen =
            false;


        safariIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "safariDockItem"
        );

    },
    250
);
}

// =========================
// MAXIMIZE STATE
// =========================

let safariIsMaximized = false;

let safariPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};

// =========================
// TOGGLE MAXIMIZE
// =========================

function toggleSafariMaximize() {

    if (
        safariIsAnimating
    ) {
        return;
    }


    // =========================
    // RESTAURAR
    // =========================

    if (
        safariIsMaximized
    ) {

        safariWindow.classList.remove(
            "maximized"
        );


        safariWindow.style.left =
            safariPreviousState.left;


        safariWindow.style.top =
            safariPreviousState.top;


        safariWindow.style.width =
            safariPreviousState.width;


        safariWindow.style.height =
            safariPreviousState.height;


        safariIsMaximized = false;


        bringToFront(
            safariWindow
        );


        return;

    }



    // =========================
    // SALVAR ESTADO ATUAL
    // =========================

    const rect =
        safariWindow.getBoundingClientRect();


    safariPreviousState.left =
        `${rect.left}px`;


    safariPreviousState.top =
        `${rect.top}px`;


    safariPreviousState.width =
        `${rect.width}px`;


    safariPreviousState.height =
        `${rect.height}px`;



    // =========================
    // CONVERTER POSIÇÃO
    // =========================

    safariWindow.style.left =
        `${rect.left}px`;

    safariWindow.style.top =
        `${rect.top}px`;

    safariWindow.style.width =
        `${rect.width}px`;

    safariWindow.style.height =
        `${rect.height}px`;


    // Força o browser
    // a reconhecer o tamanho atual

    void safariWindow.offsetWidth;


    // =========================
    // MAXIMIZAR
    // =========================

    safariWindow.classList.add(
        "maximized"
    );


    safariIsMaximized = true;


    bringToFront(
        safariWindow
    );

}


// =========================
// WINDOW FOCUS
// =========================

safariWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            safariWindow
        );

    }
);



// =========================
// DRAG WINDOW
// =========================

let isDragging = false;

let offsetX = 0;

let offsetY = 0;


safariHeader.addEventListener(
    "mousedown",
    (event) => {

        // Impede o drag caso
        // clique nos botões

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        isDragging = true;

        safariWindow.classList.add(
            "dragging"
        );


        const rect =
            safariWindow.getBoundingClientRect();


        offsetX =
            event.clientX -
            rect.left;


        offsetY =
            event.clientY -
            rect.top;


        // Remove animações

        safariWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        // Mantém posição atual

        safariWindow.style.left =
            `${rect.left}px`;

        safariWindow.style.top =
            `${rect.top}px`;

        safariWindow.style.transform =
            "none";


        bringToFront(
            safariWindow
        );


        event.preventDefault();

    }
);

// =========================
// RESIZE WINDOW
// =========================

const resizeHandle =
    safariWindow.querySelector(
        ".resize-handle"
    );


let isResizing = false;

let startWidth = 0;

let startHeight = 0;

let startMouseX = 0;

let startMouseY = 0;



// =========================
// START RESIZE
// =========================

resizeHandle.addEventListener(
    "mousedown",
    (event) => {

        isResizing = true;

        safariWindow.classList.add(
            "resizing"
        );


        const rect =
            safariWindow.getBoundingClientRect();


        startWidth =
            rect.width;

        startHeight =
            rect.height;


        startMouseX =
            event.clientX;

        startMouseY =
            event.clientY;


        safariWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            safariWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);



// =========================
// RESIZE MOVE
// =========================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !isResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            startMouseX;


        const deltaY =
            event.clientY -
            startMouseY;


        const newWidth =
            startWidth +
            deltaX;


        const newHeight =
            startHeight +
            deltaY;


        // Tamanho mínimo

        const width =
            Math.max(
                400,
                newWidth
            );


        const height =
            Math.max(
                250,
                newHeight
            );


        safariWindow.style.width =
            `${width}px`;


        safariWindow.style.height =
            `${height}px`;

    }
);



// =========================
// STOP RESIZE
// =========================

document.addEventListener(
    "mouseup",
    () => {

        isResizing = false;

        safariWindow.classList.remove(
            "resizing"
        );

    }
);



// =========================
// MOUSE MOVE
// =========================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !isDragging
        ) {
            return;
        }


        safariWindow.style.left =
            `${event.clientX - offsetX}px`;


        safariWindow.style.top =
            `${event.clientY - offsetY}px`;

    }
);



// =========================
// MOUSE UP
// =========================

document.addEventListener(
    "mouseup",
    () => {

        isDragging = false;

        safariWindow.classList.remove(
            "dragging"
        );

    }
);

function updateSystemUIHeights() {

    const desktop =
        document.querySelector(".desktop");

    const menuBar =
        document.querySelector(".menu-bar");

    const dock =
        document.querySelector(".dock");


    const desktopRect =
        desktop.getBoundingClientRect();

    const menuBarRect =
        menuBar.getBoundingClientRect();

    const dockRect =
        dock.getBoundingClientRect();


    // =========================
    // POSIÇÃO DO TOPO DA MENU BAR
    // EM RELAÇÃO AO DESKTOP
    // =========================

    const menuBarBottom =
        menuBarRect.bottom -
        desktopRect.top;


    // =========================
    // POSIÇÃO DO TOPO DO DOCK
    // EM RELAÇÃO AO DESKTOP
    // =========================

    const dockTop =
        dockRect.top -
        desktopRect.top;


    // =========================
    // ALTURA DISPONÍVEL
    // =========================

    const availableHeight =
        dockTop -
        menuBarBottom;


    // =========================
    // ENVIA PARA O CSS
    // =========================

    document.documentElement.style.setProperty(
        "--menu-bar-bottom",
        `${menuBarBottom}px`
    );


    document.documentElement.style.setProperty(
        "--maximized-window-height",
        `${availableHeight}px`
    );

}

updateSystemUIHeights();

window.addEventListener(
    "resize",
    updateSystemUIHeights
);

// ==================================================
// SETTINGS
// ==================================================

const settingsWindow =
    document.getElementById(
        "settingsWindow"
    );

const settingsHeader =
    document.getElementById(
        "settingsHeader"
    );

const settingsDockItem =
    document.getElementById(
        "settingsDockItem"
    );


let settingsIsOpen = false;

let settingsIsAnimating = false;

let settingsIsMaximized = false;


let settingsPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// GET SETTINGS DOCK POSITION
// ==================================================

function getSettingsDockPosition() {

    const dockRect =
        settingsDockItem.getBoundingClientRect();

    const windowRect =
        settingsWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}


// ==================================================
// OPEN SETTINGS
// ==================================================

function openSettings() {

    if (
        settingsIsAnimating
    ) {
        return;
    }


    // Se já estiver aberto,
    // apenas coloca na frente

    if (
        settingsIsOpen
    ) {

        bringToFront(
            settingsWindow
        );

        return;

    }


    settingsIsAnimating = true;


    // Mostra janela

    settingsWindow.style.display =
        "flex";


    // Remove animações anteriores

    settingsWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // Pega posição do Dock

    const dockPosition =
        getSettingsDockPosition();


    settingsWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    settingsWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Força reflow

    void settingsWindow.offsetWidth;


    // Começa animação

    settingsWindow.classList.add(
        "opening"
    );


    bringToFront(
        settingsWindow
    );


    settingsIsOpen = true;


    setTimeout(() => {

        settingsWindow.classList.remove(
            "opening"
        );

        settingsIsAnimating = false;

    }, 450);

}


// ==================================================
// MINIMIZE SETTINGS
// ==================================================

function minimizeSettings() {

    if (
        !settingsIsOpen ||
        settingsIsAnimating
    ) {
        return;
    }


    settingsIsAnimating = true;


    // Posição do Dock

    const dockPosition =
        getSettingsDockPosition();


    settingsWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    settingsWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Animação

    settingsWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        settingsWindow.style.display =
            "none";


        settingsWindow.classList.remove(
            "minimizing"
        );


        settingsIsOpen = false;

        settingsIsAnimating = false;

    }, 450);

}


// ==================================================
// CLOSE SETTINGS
// ==================================================

function closeSettings() {

    if (
        !settingsIsOpen ||
        settingsIsAnimating
    ) {
        return;
    }


    settingsIsAnimating = true;


    settingsWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        settingsWindow.style.display =
            "none";


        settingsWindow.classList.remove(
            "closing"
        );


        settingsIsOpen =
            false;


        settingsIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "settingsDockItem"
        );

    },
    250
);

}


// ==================================================
// MAXIMIZE SETTINGS
// ==================================================

function toggleSettingsMaximize() {

    if (
        settingsIsAnimating
    ) {
        return;
    }


    // =========================
    // RESTAURAR
    // =========================

    if (
        settingsIsMaximized
    ) {

        settingsWindow.classList.remove(
            "maximized"
        );


        settingsWindow.style.left =
            settingsPreviousState.left;


        settingsWindow.style.top =
            settingsPreviousState.top;


        settingsWindow.style.width =
            settingsPreviousState.width;


        settingsWindow.style.height =
            settingsPreviousState.height;


        settingsIsMaximized = false;


        bringToFront(
            settingsWindow
        );


        return;

    }


    // =========================
    // SALVAR ESTADO
    // =========================

    const rect =
        settingsWindow.getBoundingClientRect();


    settingsPreviousState.left =
        `${rect.left}px`;


    settingsPreviousState.top =
        `${rect.top}px`;


    settingsPreviousState.width =
        `${rect.width}px`;


    settingsPreviousState.height =
        `${rect.height}px`;


    // =========================
    // CONVERTER POSIÇÃO
    // =========================

    settingsWindow.style.left =
        `${rect.left}px`;


    settingsWindow.style.top =
        `${rect.top}px`;


    settingsWindow.style.width =
        `${rect.width}px`;


    settingsWindow.style.height =
        `${rect.height}px`;


    // Força atualização

    void settingsWindow.offsetWidth;


    // =========================
    // MAXIMIZAR
    // =========================

    settingsWindow.classList.add(
        "maximized"
    );


    settingsIsMaximized = true;


    bringToFront(
        settingsWindow
    );

}


// ==================================================
// SETTINGS FOCUS
// ==================================================

settingsWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            settingsWindow
        );

    }
);


// ==================================================
// SETTINGS DRAG
// ==================================================

let settingsIsDragging = false;

let settingsOffsetX = 0;

let settingsOffsetY = 0;


settingsHeader.addEventListener(
    "mousedown",
    (event) => {

        // Não arrasta ao clicar
        // nos botões

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        // Não arrasta maximizado

        if (
            settingsIsMaximized
        ) {
            return;
        }


        settingsIsDragging = true;


        settingsWindow.classList.add(
            "dragging"
        );


        const rect =
            settingsWindow.getBoundingClientRect();


        settingsOffsetX =
            event.clientX -
            rect.left;


        settingsOffsetY =
            event.clientY -
            rect.top;


        // Remove animações

        settingsWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        // Mantém posição atual

        settingsWindow.style.left =
            `${rect.left}px`;


        settingsWindow.style.top =
            `${rect.top}px`;


        settingsWindow.style.transform =
            "none";


        bringToFront(
            settingsWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// SETTINGS DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !settingsIsDragging
        ) {
            return;
        }


        settingsWindow.style.left =
            `${event.clientX - settingsOffsetX}px`;


        settingsWindow.style.top =
            `${event.clientY - settingsOffsetY}px`;

    }
);


// ==================================================
// SETTINGS DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        settingsIsDragging = false;


        settingsWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// SETTINGS RESIZE
// ==================================================

const settingsResizeHandle =
    settingsWindow.querySelector(
        ".resize-handle"
    );


let settingsIsResizing = false;

let settingsStartWidth = 0;

let settingsStartHeight = 0;

let settingsStartMouseX = 0;

let settingsStartMouseY = 0;


settingsResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            settingsIsMaximized
        ) {
            return;
        }


        settingsIsResizing = true;


        settingsWindow.classList.add(
            "resizing"
        );


        const rect =
            settingsWindow.getBoundingClientRect();


        settingsStartWidth =
            rect.width;


        settingsStartHeight =
            rect.height;


        settingsStartMouseX =
            event.clientX;


        settingsStartMouseY =
            event.clientY;


        settingsWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            settingsWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// SETTINGS RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !settingsIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            settingsStartMouseX;


        const deltaY =
            event.clientY -
            settingsStartMouseY;


        const newWidth =
            settingsStartWidth +
            deltaX;


        const newHeight =
            settingsStartHeight +
            deltaY;


        const width =
            Math.max(
                550,
                newWidth
            );


        const height =
            Math.max(
                350,
                newHeight
            );


        settingsWindow.style.width =
            `${width}px`;


        settingsWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// SETTINGS RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        settingsIsResizing = false;


        settingsWindow.classList.remove(
            "resizing"
        );

    }
);


// ==================================================
// SETTINGS PAGES
// ==================================================

function selectSettings(
    page,
    button
) {

    // =========================
    // REMOVE ACTIVE
    // =========================

    document
        .querySelectorAll(
            ".settings-item"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    // =========================
    // ACTIVE
    // =========================

    button.classList.add(
        "active"
    );


    const settingsPage =
        document.getElementById(
            "settingsPage"
        );


    // =========================
    // APARÊNCIA
    // =========================

    if (
        page === "appearance"
    ) {

        settingsPage.innerHTML = `

            <h1>
                Aparência
            </h1>

            <p class="settings-description">
                Personalize a aparência do BicasOS.
            </p>


            <!-- MODO -->

            <div class="appearance-section">

                <div class="appearance-section-title">
                    Modo de aparência
                </div>

                <div class="appearance-section-description">
                    Escolha como o BicasOS será exibido.
                </div>


                <div class="appearance-grid">


                    <button
                        class="appearance-option"
                        data-theme="dark"
                        onclick="setTheme('dark')"
                    >

                        <div class="
                            appearance-preview
                            dark-preview
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                             Escuro
                        </div>

                    </button>


                    <button
                        class="appearance-option"
                        data-theme="light"
                        onclick="setTheme('light')"
                    >

                        <div class="
                            appearance-preview
                            light-preview
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                             Claro
                        </div>

                    </button>


                </div>

            </div>


            <!-- WALLPAPER -->

            <div class="appearance-section">

                <div class="appearance-section-title">
                    Papel de parede
                </div>

                <div class="appearance-section-description">
                    Escolha o fundo do seu Desktop.
                </div>


                <div class="appearance-grid">


                    <button
                        class="appearance-option"
                        data-wallpaper="tahoe"
                        onclick="
                            setWallpaper('tahoe')
                        "
                    >

                        <div class="
                            appearance-preview
                            wallpaper-preview
                            wallpaper-tahoe
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                            Tahoe
                        </div>

                    </button>


                    <button
                        class="appearance-option"
                        data-wallpaper="tahoedark"
                        onclick="
                            setWallpaper('tahoedark')
                        "
                    >

                        <div class="
                            appearance-preview
                            wallpaper-preview
                            wallpaper-tahoedark
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                            Tahoe dark
                        </div>

                    </button>


                    <button
                        class="appearance-option"
                        data-wallpaper="golden"
                        onclick="
                            setWallpaper('golden')
                        "
                    >

                        <div class="
                            appearance-preview
                            wallpaper-preview
                            wallpaper-golden
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                            Golden
                        </div>

                    </button>


                    <button
                        class="appearance-option"
                        data-wallpaper="goldendark"
                        onclick="
                            setWallpaper('goldendark')
                        "
                    >

                        <div class="
                            appearance-preview
                            wallpaper-preview
                            wallpaper-goldendark
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                            Golden Dark
                        </div>

                    </button>

                    <button
                        class="appearance-option"
                        data-wallpaper="bicas"
                        onclick="
                            setWallpaper('bicas')
                        "
                    >

                        <div class="
                            appearance-preview
                            wallpaper-preview
                            wallpaper-bicas
                        "></div>

                        <div class="
                            appearance-option-title
                        ">
                            Bicas
                        </div>

                    </button>


                </div>

            </div>


            <!-- ACCENT -->

            <div class="appearance-section">

                <div class="appearance-section-title">
                    Cor de destaque
                </div>

                <div class="appearance-section-description">
                    Escolha a cor principal do BicasOS.
                </div>


                <div class="accent-options">


                    <button
                        class="
                            accent-color
                            accent-blue
                        "
                        data-accent="#0a84ff"
                        onclick="
                            setAccent('#0a84ff')
                        "
                    ></button>


                    <button
                        class="
                            accent-color
                            accent-purple
                        "
                        data-accent="#bf5af2"
                        onclick="
                            setAccent('#bf5af2')
                        "
                    ></button>


                    <button
                        class="
                            accent-color
                            accent-red
                        "
                        data-accent="#ff453a"
                        onclick="
                            setAccent('#ff453a')
                        "
                    ></button>


                    <button
                        class="
                            accent-color
                            accent-green
                        "
                        data-accent="#30d158"
                        onclick="
                            setAccent('#30d158')
                        "
                    ></button>


                    <button
                        class="
                            accent-color
                            accent-orange
                        "
                        data-accent="#ff9f0a"
                        onclick="
                            setAccent('#ff9f0a')
                        "
                    ></button>


                </div>

            </div>

        `;


        updateAppearanceUI();

        return;

    }

    // =========================
// MESA E FINDER
// =========================

if (
    page === "sound"
) {

    settingsPage.innerHTML = `

        <h1>
            Mesa e Finder
        </h1>

        <p class="settings-description">
            Personalize o Dock e a barra de menus do BicasOS.
        </p>


        <!-- =========================
             DOCK
        ========================= -->

        <div class="appearance-section">

            <div class="appearance-section-title">
                Dock
            </div>

            <div class="appearance-section-description">
                Personalize a posição e o tamanho do Dock.
            </div>


            <!-- POSIÇÃO -->

            <div class="desktop-dock-control">

                <div class="desktop-dock-label">
                    Posição do Dock
                </div>

                <select
                    id="dockPosition"
                    onchange="
                        setDockPosition(this.value)
                    "
                >

                    <option value="bottom">
                        Inferior
                    </option>

                    <option value="left">
                        Esquerda
                    </option>

                    <option value="right">
                        Direita
                    </option>

                </select>

            </div>


            <!-- TAMANHO -->

            <div class="desktop-dock-control">

                <div class="desktop-dock-label">
                    Tamanho do Dock
                </div>

                <div class="desktop-dock-slider">

                    <input
                        type="range"
                        id="dockSize"
                        min="45"
                        max="80"
                        value="59"
                        oninput="
                            setDockSize(this.value)
                        "
                    >

                    <span id="dockSizeValue">
                        59px
                    </span>

                </div>

            </div>

        </div>


        <!-- =========================
             MENU BAR
        ========================= -->

        <div class="appearance-section">

            <div class="appearance-section-title">
                Barra de Menus
            </div>

            <div class="appearance-section-description">
                Personalize as cores e a transparência da barra de menus.
            </div>


            <!-- COR DO TEXTO -->

            <div class="desktop-dock-control">

                <div class="desktop-dock-label">
                    Cor do texto
                </div>

                <input
                    type="color"
                    id="menuBarTextColor"
                    onchange="
                        setMenuBarTextColor(this.value)
                    "
                >

            </div>


            <!-- COR DO FUNDO -->

            <div class="desktop-dock-control">

                <div class="desktop-dock-label">
                    Cor do fundo
                </div>

                <input
                    type="color"
                    id="menuBarBackgroundColor"
                    onchange="
                        setMenuBarBackgroundColor(this.value)
                    "
                >

            </div>


            <!-- TRANSPARÊNCIA -->

            <div class="desktop-dock-control">

                <div class="desktop-dock-label">
                    Transparência
                </div>

                <div class="desktop-dock-slider">

                    <input
                        type="range"
                        id="menuBarOpacity"
                        min="0"
                        max="100"
                        value="70"
                        oninput="
                            setMenuBarOpacity(this.value)
                        "
                    >

                    <span id="menuBarOpacityValue">
                        70%
                    </span>

                </div>

            </div>

        </div>

    `;


    updateDesktopDockUI();

    return;

}


    // =========================
    // OUTRAS PÁGINAS
    // =========================

    const pages = {

        general: {

            title:
                "Geral",

            description:
                "Configure as preferências gerais do BicasOS."

        },


        display: {

            title:
                "Tela",

            description:
                "Configure suas opções de tela e resolução."

        },


        sound: {

            title:
                "Mesa e Finder",

            description:
                "Configure suas opções do finder e da mesa."

        },


        keyboard: {

            title:
                "Teclado",

            description:
                "Configure o teclado e seus atalhos."

        },


        mouse: {

            title:
                "Mouse",

            description:
                "Configure o comportamento do mouse."

        },


        privacy: {

            title:
                "Privacidade",

            description:
                "Gerencie suas opções de privacidade."

        }

    };


    const selected =
        pages[page];


    settingsPage.innerHTML = `

        <h1>
            ${selected.title}
        </h1>

        <p class="settings-description">
            ${selected.description}
        </p>

        <div class="settings-card">

            <div>

                <strong>
                    ${selected.title}
                </strong>

                <span>
                    Esta seção está disponível no BicasOS.
                </span>

            </div>

        </div>

    `;

}

// ==================================================
// BICASOS APPEARANCE SYSTEM
// ==================================================


// ==================================================
// APPLY THEME
// ==================================================

function applyAppearance() {

    const theme =
        localStorage.getItem(
            "bicasos-theme"
        ) || "dark";


    const wallpaper =
        localStorage.getItem(
            "bicasos-wallpaper"
        ) || "tahoe";


    const accent =
        localStorage.getItem(
            "bicasos-accent"
        ) || "#0a84ff";


    // =========================
    // THEME
    // =========================

    document.body.classList.toggle(
        "light-mode",
        theme === "light"
    );


    // =========================
    // WALLPAPER
    // =========================

    const desktop =
        document.querySelector(
            ".desktop"
        );


    const wallpapers = {

        tahoe:
            "url('assets/Fundos/macos-tahoe-26-5120x2880-22675.jpg')",

        tahoedark:
            "url('assets/Fundos/macos-tahoe-26-5120x2880-22674.jpg')",

        golden:
            "url('assets/Fundos/macos-27-golden-4480x3088-26626.png')",

        goldendark:
            "url('assets/Fundos/macos-27-golden-4480x3088-26625.png')",
        bicas:
            "url('assets/Projetos/Photoshop/projeto01.png')",

    };

    desktop.style.backgroundImage =
        wallpapers[wallpaper];


    // =========================
    // ACCENT
    // =========================

    document.documentElement.style.setProperty(
        "--accent-color",
        accent
    );


    // =========================
    // UPDATE UI
    // =========================

    updateAppearanceUI();

}


// ==================================================
// SET THEME
// ==================================================

function setTheme(
    theme
) {

    localStorage.setItem(
        "bicasos-theme",
        theme
    );


    applyAppearance();

}


// ==================================================
// SET WALLPAPER
// ==================================================

function setWallpaper(
    wallpaper
) {

    localStorage.setItem(
        "bicasos-wallpaper",
        wallpaper
    );


    applyAppearance();

}


// ==================================================
// SET ACCENT
// ==================================================

function setAccent(
    accent
) {

    localStorage.setItem(
        "bicasos-accent",
        accent
    );


    applyAppearance();

}


// ==================================================
// UPDATE APPEARANCE UI
// ==================================================

function updateAppearanceUI() {

    const theme =
        localStorage.getItem(
            "bicasos-theme"
        ) || "dark";


    const wallpaper =
        localStorage.getItem(
            "bicasos-wallpaper"
        ) || "tahoe";


    const accent =
        localStorage.getItem(
            "bicasos-accent"
        ) || "#0a84ff";


    // =========================
    // THEME
    // =========================

    document
        .querySelectorAll(
            "[data-theme]"
        )
        .forEach(
            element => {

                element.classList.toggle(

                    "selected",

                    element.dataset.theme ===
                    theme

                );

            }
        );


    // =========================
    // WALLPAPER
    // =========================

    document
        .querySelectorAll(
            "[data-wallpaper]"
        )
        .forEach(
            element => {

                element.classList.toggle(

                    "selected",

                    element.dataset.wallpaper ===
                    wallpaper

                );

            }
        );


    // =========================
    // ACCENT
    // =========================

    document
        .querySelectorAll(
            "[data-accent]"
        )
        .forEach(
            element => {

                element.classList.toggle(

                    "selected",

                    element.dataset.accent ===
                    accent

                );

            }
        );

}


// ==================================================
// LOAD APPEARANCE
// ==================================================

applyAppearance();

// ==================================================
// DESKTOP E DOCK
// ==================================================


// ==================================================
// APLICAR CONFIGURAÇÕES
// ==================================================

function applyDesktopDock() {


    // ==================================================
    // PEGAR ELEMENTOS
    // ==================================================

    const dock =
        document.querySelector(
            ".dock"
        );


    const menuBar =
        document.querySelector(
            ".menu-bar"
        );


    // ==================================================
    // CONFIGURAÇÕES SALVAS
    // ==================================================

    const dockPosition =
        localStorage.getItem(
            "bicasos-dock-position"
        ) || "bottom";


    // TAMANHO DOS ÍCONES

    const dockIconSize =
        localStorage.getItem(
            "bicasos-dock-icon-size"
        ) || "59";


    // ESCALA DO DOCK INTEIRO

    const dockScale =
        localStorage.getItem(
            "bicasos-dock-scale"
        ) || "1";


    const menuBarTextColor =
        localStorage.getItem(
            "bicasos-menubar-text"
        ) || "#ffffff";


    const menuBarBackgroundColor =
        localStorage.getItem(
            "bicasos-menubar-background"
        ) || "#1e1e1e";


    const menuBarOpacity =
        localStorage.getItem(
            "bicasos-menubar-opacity"
        ) || "70";


    // ==================================================
    // DOCK
    // ==================================================

    if (
        dock
    ) {

        // =========================
        // POSIÇÃO
        // =========================

        dock.classList.remove(
            "dock-bottom",
            "dock-left",
            "dock-right"
        );


        dock.classList.add(
            `dock-${dockPosition}`
        );


        // =========================
        // TAMANHO DOS ÍCONES
        // =========================

        dock.style.setProperty(
            "--dock-icon-size",
            `${dockIconSize}px`
        );

        dock.style.setProperty(
            "--dock-scale",
            dockScale
        );

    }


    // ==================================================
    // MENU BAR
    // ==================================================

    if (
        menuBar
    ) {

        menuBar.style.color =
            menuBarTextColor;


        menuBar.style.background =
            hexToRgba(
                menuBarBackgroundColor,
                Number(
                    menuBarOpacity
                ) / 100
            );

    }


    // ==================================================
    // VARIÁVEIS GLOBAIS
    // ==================================================

    document.documentElement.style.setProperty(
        "--menubar-text-color",
        menuBarTextColor
    );


    document.documentElement.style.setProperty(
        "--menubar-background-color",
        menuBarBackgroundColor
    );


    document.documentElement.style.setProperty(
        "--menubar-opacity",
        Number(
            menuBarOpacity
        ) / 100
    );

}


// ==================================================
// CONVERTER HEX PARA RGBA
// ==================================================

function hexToRgba(
    hex,
    opacity
) {

    hex =
        hex.replace(
            "#",
            ""
        );


    const r =
        parseInt(
            hex.substring(
                0,
                2
            ),
            16
        );


    const g =
        parseInt(
            hex.substring(
                2,
                4
            ),
            16
        );


    const b =
        parseInt(
            hex.substring(
                4,
                6
            ),
            16
        );


    return `
        rgba(
            ${r},
            ${g},
            ${b},
            ${opacity}
        )
    `;

}


// ==================================================
// POSIÇÃO DO DOCK
// ==================================================

function setDockPosition(
    position
) {

    localStorage.setItem(
        "bicasos-dock-position",
        position
    );


    applyDesktopDock();

}


// ==================================================
// TAMANHO DOS ÍCONES DO DOCK
// ==================================================

function setDockSize(
    size
) {

    localStorage.setItem(
        "bicasos-dock-icon-size",
        size
    );


    const value =
        document.getElementById(
            "dockSizeValue"
        );


    if (
        value
    ) {

        value.textContent =
            `${size}px`;

    }


    applyDesktopDock();

}


// ==================================================
// ESCALA DO DOCK
// ==================================================

function setDockScale(
    scale
) {

    localStorage.setItem(
        "bicasos-dock-scale",
        scale
    );


    const value =
        document.getElementById(
            "dockScaleValue"
        );


    if (
        value
    ) {

        value.textContent =
            `${scale}x`;

    }


    applyDesktopDock();

}


// ==================================================
// COR DO TEXTO DA MENU BAR
// ==================================================

function setMenuBarTextColor(
    color
) {

    localStorage.setItem(
        "bicasos-menubar-text",
        color
    );


    applyDesktopDock();

}


// ==================================================
// COR DO FUNDO DA MENU BAR
// ==================================================

function setMenuBarBackgroundColor(
    color
) {

    localStorage.setItem(
        "bicasos-menubar-background",
        color
    );


    applyDesktopDock();

}


// ==================================================
// OPACIDADE DA MENU BAR
// ==================================================

function setMenuBarOpacity(
    opacity
) {

    localStorage.setItem(
        "bicasos-menubar-opacity",
        opacity
    );


    const value =
        document.getElementById(
            "menuBarOpacityValue"
        );


    if (
        value
    ) {

        value.textContent =
            `${opacity}%`;

    }


    applyDesktopDock();

}


// ==================================================
// ATUALIZAR UI
// ==================================================

function updateDesktopDockUI() {


    // ==================================================
    // VALORES
    // ==================================================

    const dockPosition =
        localStorage.getItem(
            "bicasos-dock-position"
        ) || "bottom";


    const dockIconSize =
        localStorage.getItem(
            "bicasos-dock-icon-size"
        ) || "59";


    const dockScale =
        localStorage.getItem(
            "bicasos-dock-scale"
        ) || "1";


    const menuBarTextColor =
        localStorage.getItem(
            "bicasos-menubar-text"
        ) || "#ffffff";


    const menuBarBackgroundColor =
        localStorage.getItem(
            "bicasos-menubar-background"
        ) || "#1e1e1e";


    const menuBarOpacity =
        localStorage.getItem(
            "bicasos-menubar-opacity"
        ) || "70";


    // ==================================================
    // POSIÇÃO
    // ==================================================

    const dockPositionElement =
        document.getElementById(
            "dockPosition"
        );


    if (
        dockPositionElement
    ) {

        dockPositionElement.value =
            dockPosition;

    }


    // ==================================================
    // TAMANHO DOS ÍCONES
    // ==================================================

    const dockSizeElement =
        document.getElementById(
            "dockSize"
        );


    const dockSizeValue =
        document.getElementById(
            "dockSizeValue"
        );


    if (
        dockSizeElement
    ) {

        dockSizeElement.value =
            dockIconSize;

    }


    if (
        dockSizeValue
    ) {

        dockSizeValue.textContent =
            `${dockIconSize}px`;

    }


    // ==================================================
    // ESCALA DO DOCK
    // ==================================================

    const dockScaleElement =
        document.getElementById(
            "dockScale"
        );


    const dockScaleValue =
        document.getElementById(
            "dockScaleValue"
        );


    if (
        dockScaleElement
    ) {

        dockScaleElement.value =
            dockScale;

    }


    if (
        dockScaleValue
    ) {

        dockScaleValue.textContent =
            `${dockScale}x`;

    }


    // ==================================================
    // TEXTO MENU BAR
    // ==================================================

    const menuBarTextElement =
        document.getElementById(
            "menuBarTextColor"
        );


    if (
        menuBarTextElement
    ) {

        menuBarTextElement.value =
            menuBarTextColor;

    }


    // ==================================================
    // FUNDO MENU BAR
    // ==================================================

    const menuBarBackgroundElement =
        document.getElementById(
            "menuBarBackgroundColor"
        );


    if (
        menuBarBackgroundElement
    ) {

        menuBarBackgroundElement.value =
            menuBarBackgroundColor;

    }


    // ==================================================
    // OPACIDADE
    // ==================================================

    const menuBarOpacityElement =
        document.getElementById(
            "menuBarOpacity"
        );


    const menuBarOpacityValue =
        document.getElementById(
            "menuBarOpacityValue"
        );


    if (
        menuBarOpacityElement
    ) {

        menuBarOpacityElement.value =
            menuBarOpacity;

    }


    if (
        menuBarOpacityValue
    ) {

        menuBarOpacityValue.textContent =
            `${menuBarOpacity}%`;

    }

}


applyDesktopDock();

// ==================================================
// TERMINAL
// ==================================================

const terminalWindow =
    document.getElementById("terminalWindow");

const terminalHeader =
    document.getElementById("terminalHeader");

const terminalDockItem =
    document.getElementById("terminalDockItem");

const terminalInput =
    document.getElementById("terminalInput");

const terminalOutput =
    terminalWindow.querySelector(".terminal-output");


// ==================================================
// TERMINAL STATE
// ==================================================

let terminalIsOpen = false;

let terminalIsAnimating = false;

let terminalIsMaximized = false;


let terminalPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// TERMINAL DOCK POSITION
// ==================================================

function getTerminalDockPosition() {

    const dockRect =
        terminalDockItem.getBoundingClientRect();

    const windowRect =
        terminalWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}


// ==================================================
// TERMINAL AUTO SCROLL
// ==================================================

function scrollTerminalToBottom() {

    const terminalContent =
        terminalWindow.querySelector(
            ".terminal-content"
        );


    if (!terminalContent) {
        return;
    }


    terminalContent.scrollTop =
        terminalContent.scrollHeight;

}


// ==================================================
// TERMINAL COMMANDS
// ==================================================

function executeTerminalCommand(
    command
) {

    const cleanCommand =
        command
            .trim()
            .toLowerCase();


    // ==============================================
    // HELP
    // ==============================================

    if (
        cleanCommand === "help"
    ) {

        return [

            "Comandos disponíveis:",

            "",

            "help       Mostra esta lista de comandos.",

            "clear      Limpa o terminal.",

            "date       Mostra a data atual.",

            "time       Mostra a hora atual.",

            "neofetch   Mostra informações do BicasOS.",

            "version    Mostra a versão do BicasOS.",

            "echo       Exibe uma mensagem.",

            "exit       Fecha o Terminal."

        ];

    }


    // ==============================================
    // CLEAR
    // ==============================================

    if (
        cleanCommand === "clear"
    ) {

        terminalOutput.innerHTML = "";

        return null;

    }


    // ==============================================
    // DATE
    // ==============================================

    if (
        cleanCommand === "date"
    ) {

        return [

            new Date().toLocaleDateString(
                "pt-BR",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            )

        ];

    }


    // ==============================================
    // TIME
    // ==============================================

    if (
        cleanCommand === "time"
    ) {

        return [

            new Date().toLocaleTimeString(
                "pt-BR"
            )

        ];

    }


    // ==============================================
    // VERSION
    // ==============================================

    if (
        cleanCommand === "version"
    ) {

        return [

            "BicasOS 1.0"

        ];

    }


    // ==============================================
    // NEOFETCH
    // ==============================================

    if (
        cleanCommand === "neofetch"
    ) {

        return [

            "        ██████╗ ██╗ ██████╗ █████╗ ███████╗",

            "        ██╔══██╗██║██╔════╝██╔══██╗██╔════╝",

            "        ██████╔╝██║██║     ███████║███████╗",

            "        ██╔══██╗██║██║     ██╔══██║╚════██║",

            "        ██████╔╝██║╚██████╗██║  ██║███████║",

            "        ╚═════╝ ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝",

            "",

            "        OS: BicasOS 1.0",

            "        Shell: BicasShell",

            "        Desktop: BicasOS Desktop",

            "        Theme: BicasOS",

            "        Status: Online"

        ];

    }


    // ==============================================
    // ECHO
    // ==============================================

    if (
        cleanCommand.startsWith("echo ")
    ) {

        return [

            command
                .substring(5)

        ];

    }


    // ==============================================
    // EXIT
    // ==============================================

    if (
        cleanCommand === "exit"
    ) {

        closeTerminal();

        return null;

    }


    // ==============================================
    // EMPTY COMMAND
    // ==============================================

    if (
        cleanCommand === ""
    ) {

        return null;

    }


    // ==============================================
    // UNKNOWN COMMAND
    // ==============================================

    return [

        `bicasos: comando não encontrado: ${command}`,

        `Digite "help" para ver os comandos disponíveis.`

    ];

}


// ==================================================
// RUN COMMAND
// ==================================================

function runTerminalCommand() {

    const command =
        terminalInput.value.trim();


    // ==============================================
    // NÃO FAZER NADA SE ESTIVER VAZIO
    // ==============================================

    if (
        command === ""
    ) {

        terminalInput.value = "";

        return;

    }


    // ==============================================
    // MOSTRAR COMANDO DIGITADO
    // ==============================================

    const commandLine =
        document.createElement("div");


    commandLine.className =
        "terminal-line";


    commandLine.innerHTML = `

        <span class="terminal-prompt">
            bicas@bicasos ~ %
        </span>

        <span class="terminal-command">
            ${escapeTerminalHTML(command)}
        </span>

    `;


    terminalOutput.appendChild(
        commandLine
    );


    // ==============================================
    // EXECUTAR COMANDO
    // ==============================================

    const result =
        executeTerminalCommand(
            command
        );


    // ==============================================
    // MOSTRAR RESULTADO
    // ==============================================

    if (
        result &&
        result.length > 0
    ) {

        result.forEach(
            line => {

                const outputLine =
                    document.createElement(
                        "div"
                    );


                outputLine.className =
                    "terminal-line";


                outputLine.textContent =
                    line;


                terminalOutput.appendChild(
                    outputLine
                );

            }
        );

    }


    // ==============================================
    // LIMPAR INPUT
    // ==============================================

    terminalInput.value = "";


    // ==============================================
    // AUTO SCROLL
    // ==============================================

    scrollTerminalToBottom();

}


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeTerminalHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// ==================================================
// ENTER NO TERMINAL
// ==================================================

terminalInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            runTerminalCommand();

        }

    }
);


// ==================================================
// OPEN TERMINAL
// ==================================================

function openTerminal() {

    if (
        terminalIsAnimating
    ) {

        return;

    }


    // Se já estiver aberto

    if (
        terminalIsOpen
    ) {

        bringToFront(
            terminalWindow
        );


        terminalInput.focus();


        scrollTerminalToBottom();


        return;

    }


    terminalIsAnimating = true;


    terminalWindow.style.display =
        "flex";


    terminalWindow.classList.remove(
        "closing",
        "minimizing"
    );


    const dockPosition =
        getTerminalDockPosition();


    terminalWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    terminalWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    void terminalWindow.offsetWidth;


    terminalWindow.classList.add(
        "opening"
    );


    bringToFront(
        terminalWindow
    );


    terminalIsOpen = true;


    setTimeout(
        () => {

            terminalWindow.classList.remove(
                "opening"
            );


            terminalIsAnimating = false;


            terminalInput.focus();


            scrollTerminalToBottom();

        },
        450
    );

}


// ==================================================
// MINIMIZE TERMINAL
// ==================================================

function minimizeTerminal() {

    if (
        !terminalIsOpen ||
        terminalIsAnimating
    ) {

        return;

    }


    terminalIsAnimating = true;


    const dockPosition =
        getTerminalDockPosition();


    terminalWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    terminalWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    terminalWindow.classList.add(
        "minimizing"
    );


    setTimeout(
        () => {

            terminalWindow.style.display =
                "none";


            terminalWindow.classList.remove(
                "minimizing"
            );


            terminalIsOpen = false;

            terminalIsAnimating = false;

        },
        450
    );

}


// ==================================================
// CLOSE TERMINAL
// ==================================================

function closeTerminal() {

    if (
        !terminalIsOpen ||
        terminalIsAnimating
    ) {

        return;

    }


    terminalIsAnimating = true;


    terminalWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        terminalWindow.style.display =
            "none";


        terminalWindow.classList.remove(
            "closing"
        );


        terminalIsOpen =
            false;


        terminalIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "terminalDockItem"
        );

    },
    250
);

}


// ==================================================
// MAXIMIZE TERMINAL
// ==================================================

function toggleTerminalMaximize() {

    if (
        terminalIsAnimating
    ) {

        return;

    }


    // ==============================================
    // RESTAURAR
    // ==============================================

    if (
        terminalIsMaximized
    ) {

        terminalWindow.classList.remove(
            "maximized"
        );


        terminalWindow.style.left =
            terminalPreviousState.left;


        terminalWindow.style.top =
            terminalPreviousState.top;


        terminalWindow.style.width =
            terminalPreviousState.width;


        terminalWindow.style.height =
            terminalPreviousState.height;


        terminalIsMaximized = false;


        bringToFront(
            terminalWindow
        );


        return;

    }


    // ==============================================
    // SALVAR ESTADO
    // ==============================================

    const rect =
        terminalWindow.getBoundingClientRect();


    terminalPreviousState.left =
        `${rect.left}px`;


    terminalPreviousState.top =
        `${rect.top}px`;


    terminalPreviousState.width =
        `${rect.width}px`;


    terminalPreviousState.height =
        `${rect.height}px`;


    terminalWindow.style.left =
        `${rect.left}px`;


    terminalWindow.style.top =
        `${rect.top}px`;


    terminalWindow.style.width =
        `${rect.width}px`;


    terminalWindow.style.height =
        `${rect.height}px`;


    void terminalWindow.offsetWidth;


    terminalWindow.classList.add(
        "maximized"
    );


    terminalIsMaximized = true;


    bringToFront(
        terminalWindow
    );


    scrollTerminalToBottom();

}


// ==================================================
// TERMINAL FOCUS
// ==================================================

terminalWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            terminalWindow
        );

    }
);


// ==================================================
// TERMINAL DRAG
// ==================================================

let terminalIsDragging = false;

let terminalOffsetX = 0;

let terminalOffsetY = 0;


terminalHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {

            return;

        }


        if (
            terminalIsMaximized
        ) {

            return;

        }


        terminalIsDragging = true;


        terminalWindow.classList.add(
            "dragging"
        );


        const rect =
            terminalWindow.getBoundingClientRect();


        terminalOffsetX =
            event.clientX -
            rect.left;


        terminalOffsetY =
            event.clientY -
            rect.top;


        terminalWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        terminalWindow.style.left =
            `${rect.left}px`;


        terminalWindow.style.top =
            `${rect.top}px`;


        terminalWindow.style.transform =
            "none";


        bringToFront(
            terminalWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// TERMINAL DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !terminalIsDragging
        ) {

            return;

        }


        terminalWindow.style.left =
            `${event.clientX - terminalOffsetX}px`;


        terminalWindow.style.top =
            `${event.clientY - terminalOffsetY}px`;

    }
);


// ==================================================
// TERMINAL DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        terminalIsDragging = false;


        terminalWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// TERMINAL RESIZE
// ==================================================

const terminalResizeHandle =
    terminalWindow.querySelector(
        ".resize-handle"
    );


let terminalIsResizing = false;

let terminalStartWidth = 0;

let terminalStartHeight = 0;

let terminalStartMouseX = 0;

let terminalStartMouseY = 0;


terminalResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            terminalIsMaximized
        ) {

            return;

        }


        terminalIsResizing = true;


        terminalWindow.classList.add(
            "resizing"
        );


        const rect =
            terminalWindow.getBoundingClientRect();


        terminalStartWidth =
            rect.width;


        terminalStartHeight =
            rect.height;


        terminalStartMouseX =
            event.clientX;


        terminalStartMouseY =
            event.clientY;


        terminalWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            terminalWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// TERMINAL RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !terminalIsResizing
        ) {

            return;

        }


        const deltaX =
            event.clientX -
            terminalStartMouseX;


        const deltaY =
            event.clientY -
            terminalStartMouseY;


        const width =
            Math.max(
                400,
                terminalStartWidth +
                deltaX
            );


        const height =
            Math.max(
                250,
                terminalStartHeight +
                deltaY
            );


        terminalWindow.style.width =
            `${width}px`;


        terminalWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// TERMINAL RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        terminalIsResizing = false;


        terminalWindow.classList.remove(
            "resizing"
        );

    }
);

// ==================================================
// TERMINAL AUTO SCROLL
// ==================================================

function scrollTerminalToBottom() {

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}

// ==================================================
// README
// ==================================================

const readmeWindow =
    document.getElementById(
        "readmeWindow"
    );

const readmeHeader =
    document.getElementById(
        "readmeHeader"
    );

const readmeDesktopIcon =
    document.getElementById(
        "readmeDesktopIcon"
    );

const readmeTitle =
    document.getElementById(
        "readmeTitle"
    );

// ==================================================
// README ORIGINAL CONTENT
// ==================================================

const originalReadmeContent =
    readmeText.value;

// ==================================================
// README STATE
// ==================================================

let readmeIsOpen = false;

let readmeIsAnimating = false;

let readmeIsMaximized = false;


let readmePreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};

// ==================================================
// OPEN README / TXT
// ==================================================

function openReadme(
    fileName = "README.txt",
    fileContent = null
) {

    // muda o título da janela
    document.querySelector(
        "#readmeWindow .window-title"
    ).textContent = fileName;


    // muda o conteúdo
    readmeText.value =
        fileContent;

    readmeText.scrollTop =
        0;

    readmeText.scrollLeft =
        0;

    readmeText.setSelectionRange(
        0,
        0
    );

    readmeText.focus();

    readmeText.scrollTop =
        0;

    if (
        readmeIsAnimating
    ) {
        return;
    }

    if (
        fileContent !== null
    ) {

        readmeText.value =
            fileContent;

    } else {

        readmeText.value =
            originalReadmeContent;

    }


    // ==================================================
    // DEFINE O TÍTULO
    // ==================================================

    readmeTitle.textContent =
        fileName;


    // ==================================================
    // DEFINE O CONTEÚDO
    // ==================================================

    if (
        fileContent !== null
    ) {

        readmeText.value =
            fileContent;

    }


    // ==================================================
    // SE JÁ ESTIVER ABERTO
    // ==================================================

    if (
        readmeIsOpen
    ) {

        bringToFront(
            readmeWindow
        );

        readmeText.focus();

        return;

    }


    readmeIsAnimating = true;


    // ==================================================
    // MOSTRA JANELA
    // ==================================================

    readmeWindow.style.display =
        "flex";


    // ==================================================
    // REMOVE ESTADOS ANTERIORES
    // ==================================================

    readmeWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // ==================================================
    // POSIÇÃO INICIAL
    // ==================================================

    const iconRect =
        readmeDesktopIcon.getBoundingClientRect();

    const windowRect =
        readmeWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const iconCenterX =
        iconRect.left +
        iconRect.width / 2;

    const iconCenterY =
        iconRect.top +
        iconRect.height / 2;


    readmeWindow.style.setProperty(
        "--dock-x",
        `${iconCenterX - windowCenterX}px`
    );


    readmeWindow.style.setProperty(
        "--dock-y",
        `${iconCenterY - windowCenterY}px`
    );


    // ==================================================
    // FORÇA REFLOW
    // ==================================================

    void readmeWindow.offsetWidth;


    // ==================================================
    // INICIA ANIMAÇÃO
    // ==================================================

    readmeWindow.classList.add(
        "opening"
    );


    bringToFront(
        readmeWindow
    );


    readmeIsOpen = true;


    // ==================================================
    // FINALIZA ANIMAÇÃO
    // ==================================================

    setTimeout(() => {

        readmeWindow.classList.remove(
            "opening"
        );


        readmeIsAnimating =
            false;


        readmeText.focus();

    }, 450);

}


// ==================================================
// MINIMIZE README
// ==================================================

function minimizeReadme() {

    if (
        !readmeIsOpen ||
        readmeIsAnimating
    ) {
        return;
    }


    readmeIsAnimating = true;


    // ==================================================
    // POSIÇÃO DO ÍCONE
    // ==================================================

    const iconRect =
        readmeDesktopIcon.getBoundingClientRect();

    const windowRect =
        readmeWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const iconCenterX =
        iconRect.left +
        iconRect.width / 2;

    const iconCenterY =
        iconRect.top +
        iconRect.height / 2;


    readmeWindow.style.setProperty(
        "--dock-x",
        `${iconCenterX - windowCenterX}px`
    );


    readmeWindow.style.setProperty(
        "--dock-y",
        `${iconCenterY - windowCenterY}px`
    );


    // Animação

    readmeWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        readmeWindow.style.display =
            "none";


        readmeWindow.classList.remove(
            "minimizing"
        );


        readmeIsOpen = false;

        readmeIsAnimating = false;

    }, 450);

}


// ==================================================
// CLOSE README
// ==================================================

function closeReadme() {

    if (
        !readmeIsOpen ||
        readmeIsAnimating
    ) {
        return;
    }


    readmeIsAnimating = true;


    readmeWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        readmeWindow.style.display =
            "none";


        readmeWindow.classList.remove(
            "closing"
        );


        readmeIsOpen =
            false;


        readmeIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "readmeDockItem"
        );

    },
    250
);

setTimeout(
    () => {

        setDockAppClosed(
            "readmeDockItem"
        );

    },
    150
);

}


// ==================================================
// MAXIMIZE README
// ==================================================

function toggleReadmeMaximize() {

    if (
        readmeIsAnimating
    ) {
        return;
    }


    // ==================================================
    // RESTAURAR
    // ==================================================

    if (
        readmeIsMaximized
    ) {

        readmeWindow.classList.remove(
            "maximized"
        );


        readmeWindow.style.left =
            readmePreviousState.left;


        readmeWindow.style.top =
            readmePreviousState.top;


        readmeWindow.style.width =
            readmePreviousState.width;


        readmeWindow.style.height =
            readmePreviousState.height;


        readmeIsMaximized = false;


        bringToFront(
            readmeWindow
        );


        return;

    }


    // ==================================================
    // SALVAR ESTADO
    // ==================================================

    const rect =
        readmeWindow.getBoundingClientRect();


    readmePreviousState.left =
        `${rect.left}px`;


    readmePreviousState.top =
        `${rect.top}px`;


    readmePreviousState.width =
        `${rect.width}px`;


    readmePreviousState.height =
        `${rect.height}px`;


    // ==================================================
    // CONVERTER POSIÇÃO
    // ==================================================

    readmeWindow.style.left =
        `${rect.left}px`;


    readmeWindow.style.top =
        `${rect.top}px`;


    readmeWindow.style.width =
        `${rect.width}px`;


    readmeWindow.style.height =
        `${rect.height}px`;


    // Força atualização

    void readmeWindow.offsetWidth;


    // ==================================================
    // MAXIMIZAR
    // ==================================================

    readmeWindow.classList.add(
        "maximized"
    );


    readmeIsMaximized = true;


    bringToFront(
        readmeWindow
    );

}


// ==================================================
// README FOCUS
// ==================================================

readmeWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            readmeWindow
        );

    }
);


// ==================================================
// README DRAG
// ==================================================

let readmeIsDragging = false;

let readmeOffsetX = 0;

let readmeOffsetY = 0;


readmeHeader.addEventListener(
    "mousedown",
    (event) => {

        // Não arrastar pelos botões

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        // Não arrastar maximizado

        if (
            readmeIsMaximized
        ) {
            return;
        }


        readmeIsDragging = true;


        readmeWindow.classList.add(
            "dragging"
        );


        const rect =
            readmeWindow.getBoundingClientRect();


        readmeOffsetX =
            event.clientX -
            rect.left;


        readmeOffsetY =
            event.clientY -
            rect.top;


        // Remove animações

        readmeWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        // Mantém posição atual

        readmeWindow.style.left =
            `${rect.left}px`;


        readmeWindow.style.top =
            `${rect.top}px`;


        readmeWindow.style.transform =
            "none";


        bringToFront(
            readmeWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// README DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !readmeIsDragging
        ) {
            return;
        }


        readmeWindow.style.left =
            `${event.clientX - readmeOffsetX}px`;


        readmeWindow.style.top =
            `${event.clientY - readmeOffsetY}px`;

    }
);


// ==================================================
// README DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        readmeIsDragging = false;


        readmeWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// README RESIZE
// ==================================================

const readmeResizeHandle =
    readmeWindow.querySelector(
        ".resize-handle"
    );


let readmeIsResizing = false;

let readmeStartWidth = 0;

let readmeStartHeight = 0;

let readmeStartMouseX = 0;

let readmeStartMouseY = 0;


readmeResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            readmeIsMaximized
        ) {
            return;
        }


        readmeIsResizing = true;


        readmeWindow.classList.add(
            "resizing"
        );


        const rect =
            readmeWindow.getBoundingClientRect();


        readmeStartWidth =
            rect.width;


        readmeStartHeight =
            rect.height;


        readmeStartMouseX =
            event.clientX;


        readmeStartMouseY =
            event.clientY;


        readmeWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            readmeWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// README RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !readmeIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            readmeStartMouseX;


        const deltaY =
            event.clientY -
            readmeStartMouseY;


        const newWidth =
            readmeStartWidth +
            deltaX;


        const newHeight =
            readmeStartHeight +
            deltaY;


        const width =
            Math.max(
                400,
                newWidth
            );


        const height =
            Math.max(
                300,
                newHeight
            );


        readmeWindow.style.width =
            `${width}px`;


        readmeWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// README RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        readmeIsResizing = false;


        readmeWindow.classList.remove(
            "resizing"
        );

    }
);

// ==================================================
// FINDER
// ==================================================

const finderWindow =
    document.getElementById(
        "finderWindow"
    );

const finderHeader =
    document.getElementById(
        "finderHeader"
    );

const finderDockItem =
    document.getElementById(
        "finderDockItem"
    );

const finderContent =
    finderWindow.querySelector(
        ".finder-content"
    );

const finderPath =
    document.getElementById(
        "finderPath"
    );

const finderBackButton =
    document.getElementById(
        "finderBackButton"
    );


// ==================================================
// FINDER STATE
// ==================================================

let finderIsOpen =
    false;

let finderIsAnimating =
    false;

let finderIsMaximized =
    false;


// ==================================================
// CAMINHO ATUAL
// ==================================================
//
// []                         = Finder
// ["Projetos"]               = Finder / Projetos
// ["Projetos", "Photoshop"]  = Finder / Projetos / Photoshop
//

let finderCurrentPath =
    [];

// ==================================================
// VIRTUAL FILE SYSTEM
// ==================================================

const virtualFiles = {

    "Finder": {

        type: "folder",

        children: {}

    }

};


// ==================================================
// ESTADO ANTERIOR
// ==================================================

let finderPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// GET FINDER DOCK POSITION
// ==================================================

function getFinderDockPosition() {

    const dockRect =
        finderDockItem.getBoundingClientRect();

    const windowRect =
        finderWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}


// ==================================================
// OPEN FINDER
// ==================================================

function openFinder() {

    if (
        finderIsAnimating
    ) {
        return;
    }


    // Sempre abre na raiz

    finderCurrentPath =
        [];


    renderFinder();


    // Se já estiver aberto

    if (
        finderIsOpen
    ) {

        bringToFront(
            finderWindow
        );

        return;

    }


    finderIsAnimating =
        true;


    finderWindow.style.display =
        "flex";


    finderWindow.classList.remove(
        "closing",
        "minimizing"
    );


    const dockPosition =
        getFinderDockPosition();


    finderWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    finderWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    void finderWindow.offsetWidth;


    finderWindow.classList.add(
        "opening"
    );


    bringToFront(
        finderWindow
    );


    finderIsOpen =
        true;


    setTimeout(
        () => {

            finderWindow.classList.remove(
                "opening"
            );


            finderIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// OPEN FINDER AT PATH
// ==================================================
//
// Exemplos:
//
// openFinderPath(["Projetos"]);
//
// openFinderPath(
//     ["Projetos", "Photoshop"]
// );
//

function openFinderPath(
    path
) {

    if (
        finderIsAnimating
    ) {
        return;
    }


    finderCurrentPath =
        [...path];


    renderFinder();


    // Se já estiver aberto

    if (
        finderIsOpen
    ) {

        bringToFront(
            finderWindow
        );

        return;

    }


    finderIsAnimating =
        true;


    finderWindow.style.display =
        "flex";


    finderWindow.classList.remove(
        "closing",
        "minimizing"
    );


    const dockPosition =
        getFinderDockPosition();


    finderWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    finderWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    void finderWindow.offsetWidth;


    finderWindow.classList.add(
        "opening"
    );


    bringToFront(
        finderWindow
    );


    finderIsOpen =
        true;


    setTimeout(
        () => {

            finderWindow.classList.remove(
                "opening"
            );


            finderIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// OPEN FINDER FOLDER
// ==================================================

function openFinderFolder(
    folderName
) {

    finderCurrentPath.push(
        folderName
    );


    renderFinder();


    bringToFront(
        finderWindow
    );

}


// ==================================================
// RENDER FINDER
// ==================================================

function renderFinder() {

    // ==================================================
    // CAMINHO
    // ==================================================

    if (
        finderCurrentPath.length === 0
    ) {

        finderPath.textContent =
            "Finder";

    } else {

        finderPath.textContent =
            "Finder / " +
            finderCurrentPath.join(
                " / "
            );

    }


    // ==================================================
    // BOTÃO VOLTAR
    // ==================================================

    finderBackButton.disabled =
        finderCurrentPath.length === 0;


    // ==================================================
    // RAIZ
    // ==================================================

    if (
        finderCurrentPath.length === 0
    ) {

        finderContent.innerHTML = `

            <div
                class="finder-item"
                ondblclick="
                    openFinderFolder(
                        'Projetos'
                    )
                "
            >

                <img
                    src="assets/Icons/pasta.png"
                    alt="Projetos"
                >

                <span>
                    Projetos
                </span>

            </div>


            <div
                class="finder-item"
                ondblclick="
                    openFinderFolder(
                        'Sobre Mim'
                    )
                "
            >

                <img
                    src="assets/Icons/pasta.png"
                    alt="Sobre Mim"
                >

                <span>
                    Sobre Mim
                </span>

            </div>

        `;

        return;

    }


    // ==================================================
    // PROJETOS
    // ==================================================

    if (
        finderCurrentPath.length === 1 &&
        finderCurrentPath[0] ===
        "Projetos"
    ) {

        finderContent.innerHTML = `

            <div
                class="finder-item"
                ondblclick="
                    openFinderFolder(
                        'Photoshop'
                    )
                "
            >

                <img
                    src="assets/Icons/pasta.png"
                    alt="Photoshop"
                >

                <span>
                    Photoshop
                </span>

            </div>

        `;

        return;

    }


    // ==================================================
    // PHOTOSHOP
    // ==================================================

    if (
        finderCurrentPath.length === 2 &&

        finderCurrentPath[0] ===
        "Projetos" &&

        finderCurrentPath[1] ===
        "Photoshop"
    ) {

        finderContent.innerHTML = `

            <div
                class="finder-item"
                onclick="
                    openImageViewer(
                        'assets/Projetos/Photoshop/projeto01.png',
                        'Projeto 01'
                    )
                "
            >

                <img
                    src="assets/Projetos/Photoshop/projeto01.png"
                    alt="Projeto 01"
                >

                <span>
                    Projeto 01
                </span>

            </div>


            <div
                class="finder-item"
                onclick="
                    openImageViewer(
                        'assets/Projetos/Photoshop/projeto02.png',
                        'Projeto 02'
                    )
                "
            >

                <img
                    src="assets/Projetos/Photoshop/projeto02.png"
                    alt="Projeto 02"
                >

                <span>
                    Projeto 02
                </span>

            </div>


            <div
                class="finder-item"
                onclick="
                    openImageViewer(
                        'assets/Projetos/Photoshop/projeto03.png',
                        'Projeto 03'
                    )
                "
            >

                <img
                    src="assets/Projetos/Photoshop/projeto03.png"
                    alt="Projeto 03"
                >

                <span>
                    Projeto 03
                </span>

            </div>

        `;

        return;

    }


    // ==================================================
    // SOBRE MIM
    // ==================================================

    if (
        finderCurrentPath.length === 1 &&
        finderCurrentPath[0] ===
        "Sobre Mim"
    ) {

        finderContent.innerHTML = `

            <div
                class="finder-empty"
            >

                Esta pasta está vazia.

            </div>

        `;

        return;

    }


    // ==================================================
    // PASTA NÃO ENCONTRADA
    // ==================================================

    finderContent.innerHTML = `

        <div
            class="finder-empty"
        >

            Esta pasta está vazia.

        </div>

    `;

}


// ==================================================
// GO BACK
// ==================================================

function finderGoBack() {

    if (
        finderCurrentPath.length === 0
    ) {
        return;
    }


    // Remove a última pasta

    finderCurrentPath.pop();


    renderFinder();


    bringToFront(
        finderWindow
    );

}


// ==================================================
// MINIMIZE FINDER
// ==================================================

function minimizeFinder() {

    if (
        !finderIsOpen ||
        finderIsAnimating
    ) {
        return;
    }


    finderIsAnimating =
        true;


    const dockPosition =
        getFinderDockPosition();


    finderWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    finderWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    finderWindow.classList.add(
        "minimizing"
    );


    setTimeout(
        () => {

            finderWindow.style.display =
                "none";


            finderWindow.classList.remove(
                "minimizing"
            );


            finderIsOpen =
                false;


            finderIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// CLOSE FINDER
// ==================================================

function closeFinder() {

    if (
        !finderIsOpen ||
        finderIsAnimating
    ) {
        return;
    }


    finderIsAnimating =
        true;


    finderWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        finderWindow.style.display =
            "none";


        finderWindow.classList.remove(
            "closing"
        );


        finderIsOpen =
            false;


        finderIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "finderDockItem"
        );

            finderCurrentPath =
                [];


            renderFinder();

        },
        250
    );

}


// ==================================================
// MAXIMIZE FINDER
// ==================================================

function toggleFinderMaximize() {

    if (
        finderIsAnimating
    ) {
        return;
    }


    // ==================================================
    // RESTAURAR
    // ==================================================

    if (
        finderIsMaximized
    ) {

        finderWindow.classList.remove(
            "maximized"
        );


        finderWindow.style.left =
            finderPreviousState.left;


        finderWindow.style.top =
            finderPreviousState.top;


        finderWindow.style.width =
            finderPreviousState.width;


        finderWindow.style.height =
            finderPreviousState.height;


        finderIsMaximized =
            false;


        bringToFront(
            finderWindow
        );


        return;

    }


    // ==================================================
    // SALVAR ESTADO
    // ==================================================

    const rect =
        finderWindow.getBoundingClientRect();


    finderPreviousState.left =
        `${rect.left}px`;


    finderPreviousState.top =
        `${rect.top}px`;


    finderPreviousState.width =
        `${rect.width}px`;


    finderPreviousState.height =
        `${rect.height}px`;


    // ==================================================
    // CONVERTER POSIÇÃO
    // ==================================================

    finderWindow.style.left =
        `${rect.left}px`;


    finderWindow.style.top =
        `${rect.top}px`;


    finderWindow.style.width =
        `${rect.width}px`;


    finderWindow.style.height =
        `${rect.height}px`;


    void finderWindow.offsetWidth;


    // ==================================================
    // MAXIMIZAR
    // ==================================================

    finderWindow.classList.add(
        "maximized"
    );


    finderIsMaximized =
        true;


    bringToFront(
        finderWindow
    );

}


// ==================================================
// FINDER FOCUS
// ==================================================

finderWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            finderWindow
        );

    }
);


// ==================================================
// FINDER DRAG
// ==================================================

let finderIsDragging =
    false;

let finderOffsetX =
    0;

let finderOffsetY =
    0;


finderHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        if (
            finderIsMaximized
        ) {
            return;
        }


        finderIsDragging =
            true;


        finderWindow.classList.add(
            "dragging"
        );


        const rect =
            finderWindow.getBoundingClientRect();


        finderOffsetX =
            event.clientX -
            rect.left;


        finderOffsetY =
            event.clientY -
            rect.top;


        finderWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        finderWindow.style.left =
            `${rect.left}px`;


        finderWindow.style.top =
            `${rect.top}px`;


        finderWindow.style.transform =
            "none";


        bringToFront(
            finderWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// FINDER DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !finderIsDragging
        ) {
            return;
        }


        finderWindow.style.left =
            `${event.clientX -
            finderOffsetX}px`;


        finderWindow.style.top =
            `${event.clientY -
            finderOffsetY}px`;

    }
);


// ==================================================
// FINDER DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        finderIsDragging =
            false;


        finderWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// FINDER RESIZE
// ==================================================

const finderResizeHandle =
    finderWindow.querySelector(
        ".resize-handle"
    );


let finderIsResizing =
    false;

let finderStartWidth =
    0;

let finderStartHeight =
    0;

let finderStartMouseX =
    0;

let finderStartMouseY =
    0;


finderResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            finderIsMaximized
        ) {
            return;
        }


        finderIsResizing =
            true;


        finderWindow.classList.add(
            "resizing"
        );


        const rect =
            finderWindow.getBoundingClientRect();


        finderStartWidth =
            rect.width;


        finderStartHeight =
            rect.height;


        finderStartMouseX =
            event.clientX;


        finderStartMouseY =
            event.clientY;


        finderWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            finderWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// FINDER RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !finderIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            finderStartMouseX;


        const deltaY =
            event.clientY -
            finderStartMouseY;


        const width =
            Math.max(
                500,
                finderStartWidth +
                deltaX
            );


        const height =
            Math.max(
                300,
                finderStartHeight +
                deltaY
            );


        finderWindow.style.width =
            `${width}px`;


        finderWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// FINDER RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        finderIsResizing =
            false;


        finderWindow.classList.remove(
            "resizing"
        );

    }
);


// ==================================================
// INITIAL FINDER
// ==================================================

renderFinder();

// ==================================================
// IMAGE VIEWER
// ==================================================

const imageViewerWindow =
    document.getElementById(
        "imageViewerWindow"
    );

const imageViewerHeader =
    document.getElementById(
        "imageViewerHeader"
    );

const imageViewerImage =
    document.getElementById(
        "imageViewerImage"
    );

const imageViewerTitle =
    document.getElementById(
        "imageViewerTitle"
    );


// ==================================================
// IMAGE VIEWER STATE
// ==================================================

let imageViewerIsOpen = false;

let imageViewerIsAnimating = false;

let imageViewerIsMaximized = false;


let imageViewerPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// OPEN IMAGE VIEWER
// ==================================================

function openImageViewer(
    imageSrc,
    imageTitle
) {

    if (
        imageViewerIsAnimating
    ) {
        return;
    }


    imageViewerImage.src =
        imageSrc;


    imageViewerImage.alt =
        imageTitle;


    imageViewerTitle.textContent =
        imageTitle;


    // =========================
    // DOCK
    // =========================

    const imageViewerDockItem =
        document.getElementById(
            "imageViewerDockItem"
        );


    if (
        imageViewerDockItem
    ) {

        imageViewerDockItem.classList.remove(
            "app-closing"
        );

        imageViewerDockItem.classList.add(
            "app-open"
        );

    }


    // =========================
    // JÁ ESTÁ ABERTO
    // =========================

    if (
        imageViewerIsOpen
    ) {

        bringToFront(
            imageViewerWindow
        );

        return;

    }

    // resto do seu código...


    imageViewerIsAnimating = true;


    // ==================================================
    // MOSTRAR JANELA
    // ==================================================

    imageViewerWindow.style.display =
        "flex";
    
    setDockAppOpen(
        "imageViewerDockItem"
    );


    imageViewerWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // ==================================================
    // POSIÇÃO INICIAL
    // ==================================================

    const centerX =
        (
            window.innerWidth -
            imageViewerWindow.offsetWidth
        ) / 2;


    const centerY =
        (
            window.innerHeight -
            imageViewerWindow.offsetHeight
        ) / 2;


    imageViewerWindow.style.left =
        `${Math.max(20, centerX)}px`;


    imageViewerWindow.style.top =
        `${Math.max(50, centerY)}px`;


    imageViewerWindow.style.transform =
        "none";


    // ==================================================
    // ABRIR
    // ==================================================

    void imageViewerWindow.offsetWidth;


    imageViewerWindow.classList.add(
        "opening"
    );


    bringToFront(
        imageViewerWindow
    );


    imageViewerIsOpen = true;


    setTimeout(() => {

        imageViewerWindow.classList.remove(
            "opening"
        );


        imageViewerIsAnimating =
            false;

    }, 450);

}


// ==================================================
// CLOSE
// ==================================================

function closeImageViewer() {

    if (
        !imageViewerIsOpen ||
        imageViewerIsAnimating
    ) {
        return;
    }


    imageViewerIsAnimating =
        true;


    // =========================
    // ANIMAÇÃO DO APP
    // =========================

    imageViewerWindow.classList.add(
        "closing"
    );


    // =========================
    // ANIMAÇÃO DO DOCK
    // =========================

    const imageViewerDockItem =
        document.getElementById(
            "imageViewerDockItem"
        );


    if (
        imageViewerDockItem
    ) {

        imageViewerDockItem.classList.add(
            "app-closing"
        );

    }


    setTimeout(() => {

        imageViewerWindow.style.display =
            "none";


        imageViewerWindow.classList.remove(
            "closing"
        );


        // Remove estado visual
        // depois da animação

        if (
            imageViewerDockItem
        ) {

            imageViewerDockItem.classList.remove(
                "app-open",
                "app-active",
                "app-closing"
            );

        }


        imageViewerIsOpen =
            false;


        imageViewerIsAnimating =
            false;

    }, 350);

}


// ==================================================
// MINIMIZE
// ==================================================

function minimizeImageViewer() {

    if (
        !imageViewerIsOpen ||
        imageViewerIsAnimating
    ) {
        return;
    }


    imageViewerIsAnimating =
        true;


    imageViewerWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        imageViewerWindow.style.display =
            "none";


        imageViewerWindow.classList.remove(
            "minimizing"
        );


        imageViewerIsOpen =
            false;


        imageViewerIsAnimating =
            false;

    }, 450);

}


// ==================================================
// MAXIMIZE
// ==================================================

function toggleImageViewerMaximize() {

    if (
        imageViewerIsAnimating
    ) {
        return;
    }


    // ==================================================
    // RESTAURAR
    // ==================================================

    if (
        imageViewerIsMaximized
    ) {

        imageViewerWindow.classList.remove(
            "maximized"
        );


        imageViewerWindow.style.left =
            imageViewerPreviousState.left;


        imageViewerWindow.style.top =
            imageViewerPreviousState.top;


        imageViewerWindow.style.width =
            imageViewerPreviousState.width;


        imageViewerWindow.style.height =
            imageViewerPreviousState.height;


        imageViewerIsMaximized =
            false;


        bringToFront(
            imageViewerWindow
        );


        return;

    }


    // ==================================================
    // SALVAR ESTADO
    // ==================================================

    const rect =
        imageViewerWindow.getBoundingClientRect();


    imageViewerPreviousState.left =
        `${rect.left}px`;


    imageViewerPreviousState.top =
        `${rect.top}px`;


    imageViewerPreviousState.width =
        `${rect.width}px`;


    imageViewerPreviousState.height =
        `${rect.height}px`;


    // ==================================================
    // CONVERTER POSIÇÃO
    // ==================================================

    imageViewerWindow.style.left =
        `${rect.left}px`;


    imageViewerWindow.style.top =
        `${rect.top}px`;


    imageViewerWindow.style.width =
        `${rect.width}px`;


    imageViewerWindow.style.height =
        `${rect.height}px`;


    void imageViewerWindow.offsetWidth;


    // ==================================================
    // MAXIMIZAR
    // ==================================================

    imageViewerWindow.classList.add(
        "maximized"
    );


    imageViewerIsMaximized =
        true;


    bringToFront(
        imageViewerWindow
    );

}


// ==================================================
// FOCUS
// ==================================================

imageViewerWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            imageViewerWindow
        );

    }
);


// ==================================================
// DRAG
// ==================================================

let imageViewerIsDragging =
    false;

let imageViewerOffsetX =
    0;

let imageViewerOffsetY =
    0;


imageViewerHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        if (
            imageViewerIsMaximized
        ) {
            return;
        }


        imageViewerIsDragging =
            true;


        imageViewerWindow.classList.add(
            "dragging"
        );


        const rect =
            imageViewerWindow.getBoundingClientRect();


        imageViewerOffsetX =
            event.clientX -
            rect.left;


        imageViewerOffsetY =
            event.clientY -
            rect.top;


        imageViewerWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        imageViewerWindow.style.left =
            `${rect.left}px`;


        imageViewerWindow.style.top =
            `${rect.top}px`;


        imageViewerWindow.style.transform =
            "none";


        bringToFront(
            imageViewerWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !imageViewerIsDragging
        ) {
            return;
        }


        imageViewerWindow.style.left =
            `${event.clientX -
            imageViewerOffsetX}px`;


        imageViewerWindow.style.top =
            `${event.clientY -
            imageViewerOffsetY}px`;

    }
);


// ==================================================
// DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        imageViewerIsDragging =
            false;


        imageViewerWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// RESIZE
// ==================================================

const imageViewerResizeHandle =
    imageViewerWindow.querySelector(
        ".resize-handle"
    );


let imageViewerIsResizing =
    false;

let imageViewerStartWidth =
    0;

let imageViewerStartHeight =
    0;

let imageViewerStartMouseX =
    0;

let imageViewerStartMouseY =
    0;


imageViewerResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            imageViewerIsMaximized
        ) {
            return;
        }


        imageViewerIsResizing =
            true;


        imageViewerWindow.classList.add(
            "resizing"
        );


        const rect =
            imageViewerWindow.getBoundingClientRect();


        imageViewerStartWidth =
            rect.width;


        imageViewerStartHeight =
            rect.height;


        imageViewerStartMouseX =
            event.clientX;


        imageViewerStartMouseY =
            event.clientY;


        imageViewerWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            imageViewerWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !imageViewerIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            imageViewerStartMouseX;


        const deltaY =
            event.clientY -
            imageViewerStartMouseY;


        const width =
            Math.max(
                400,
                imageViewerStartWidth +
                deltaX
            );


        const height =
            Math.max(
                300,
                imageViewerStartHeight +
                deltaY
            );


        imageViewerWindow.style.width =
            `${width}px`;


        imageViewerWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        imageViewerIsResizing =
            false;


        imageViewerWindow.classList.remove(
            "resizing"
        );

    }
);

// ==================================================
// TRASH
// ==================================================

const trashWindow =
    document.getElementById(
        "trashWindow"
    );

const trashHeader =
    document.getElementById(
        "trashHeader"
    );

const trashDockItem =
    document.getElementById(
        "trashDockItem"
    );


// ==================================================
// TRASH STATE
// ==================================================

let trashIsOpen = false;

let trashIsAnimating = false;

let trashIsMaximized = false;


let trashPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// GET TRASH DOCK POSITION
// ==================================================

function getTrashDockPosition() {

    const dockRect =
        trashDockItem.getBoundingClientRect();

    const windowRect =
        trashWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}


// ==================================================
// OPEN TRASH
// ==================================================

function openTrash() {

    if (
        trashIsAnimating
    ) {
        return;
    }


    // Se já estiver aberto,
    // apenas coloca na frente

    if (
        trashIsOpen
    ) {

        bringToFront(
            trashWindow
        );

        return;

    }


    trashIsAnimating = true;


    // Mostra janela

    trashWindow.style.display =
        "flex";


    // Remove animações anteriores

    trashWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // Pega posição do Dock

    const dockPosition =
        getTrashDockPosition();


    trashWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    trashWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Força reflow

    void trashWindow.offsetWidth;


    // Começa animação

    trashWindow.classList.add(
        "opening"
    );


    bringToFront(
        trashWindow
    );


    trashIsOpen = true;


    setTimeout(() => {

        trashWindow.classList.remove(
            "opening"
        );

        trashIsAnimating = false;

    }, 450);

}


// ==================================================
// MINIMIZE TRASH
// ==================================================

function minimizeTrash() {

    if (
        !trashIsOpen ||
        trashIsAnimating
    ) {
        return;
    }


    trashIsAnimating = true;


    // Posição do Dock

    const dockPosition =
        getTrashDockPosition();


    trashWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    trashWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // Animação

    trashWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        trashWindow.style.display =
            "none";


        trashWindow.classList.remove(
            "minimizing"
        );


        trashIsOpen = false;

        trashIsAnimating = false;

    }, 450);

}


// ==================================================
// CLOSE TRASH
// ==================================================

function closeTrash() {

    if (
        !trashIsOpen ||
        trashIsAnimating
    ) {
        return;
    }


    trashIsAnimating = true;


    trashWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        trashWindow.style.display =
            "none";


        trashWindow.classList.remove(
            "closing"
        );


        trashIsOpen =
            false;


        trashIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "trashDockItem"
        );

    },
    250
);

}


// ==================================================
// MAXIMIZE TRASH
// ==================================================

function toggleTrashMaximize() {

    if (
        trashIsAnimating
    ) {
        return;
    }


    // =========================
    // RESTAURAR
    // =========================

    if (
        trashIsMaximized
    ) {

        trashWindow.classList.remove(
            "maximized"
        );


        trashWindow.style.left =
            trashPreviousState.left;


        trashWindow.style.top =
            trashPreviousState.top;


        trashWindow.style.width =
            trashPreviousState.width;


        trashWindow.style.height =
            trashPreviousState.height;


        trashIsMaximized = false;


        bringToFront(
            trashWindow
        );


        return;

    }


    // =========================
    // SALVAR ESTADO
    // =========================

    const rect =
        trashWindow.getBoundingClientRect();


    trashPreviousState.left =
        `${rect.left}px`;


    trashPreviousState.top =
        `${rect.top}px`;


    trashPreviousState.width =
        `${rect.width}px`;


    trashPreviousState.height =
        `${rect.height}px`;


    // =========================
    // CONVERTER POSIÇÃO
    // =========================

    trashWindow.style.left =
        `${rect.left}px`;


    trashWindow.style.top =
        `${rect.top}px`;


    trashWindow.style.width =
        `${rect.width}px`;


    trashWindow.style.height =
        `${rect.height}px`;


    // Força atualização

    void trashWindow.offsetWidth;


    // =========================
    // MAXIMIZAR
    // =========================

    trashWindow.classList.add(
        "maximized"
    );


    trashIsMaximized = true;


    bringToFront(
        trashWindow
    );

}


// ==================================================
// TRASH FOCUS
// ==================================================

trashWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            trashWindow
        );

    }
);


// ==================================================
// TRASH DRAG
// ==================================================

let trashIsDragging = false;

let trashOffsetX = 0;

let trashOffsetY = 0;


trashHeader.addEventListener(
    "mousedown",
    (event) => {

        // Não arrasta ao clicar
        // nos botões

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        // Não arrasta maximizado

        if (
            trashIsMaximized
        ) {
            return;
        }


        trashIsDragging = true;


        trashWindow.classList.add(
            "dragging"
        );


        const rect =
            trashWindow.getBoundingClientRect();


        trashOffsetX =
            event.clientX -
            rect.left;


        trashOffsetY =
            event.clientY -
            rect.top;


        // Remove animações

        trashWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        // Mantém posição atual

        trashWindow.style.left =
            `${rect.left}px`;


        trashWindow.style.top =
            `${rect.top}px`;


        trashWindow.style.transform =
            "none";


        bringToFront(
            trashWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// TRASH DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !trashIsDragging
        ) {
            return;
        }


        trashWindow.style.left =
            `${event.clientX -
            trashOffsetX}px`;


        trashWindow.style.top =
            `${event.clientY -
            trashOffsetY}px`;

    }
);


// ==================================================
// TRASH DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        trashIsDragging = false;


        trashWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// TRASH RESIZE
// ==================================================

const trashResizeHandle =
    trashWindow.querySelector(
        ".resize-handle"
    );


let trashIsResizing = false;

let trashStartWidth = 0;

let trashStartHeight = 0;

let trashStartMouseX = 0;

let trashStartMouseY = 0;


trashResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            trashIsMaximized
        ) {
            return;
        }


        trashIsResizing = true;


        trashWindow.classList.add(
            "resizing"
        );


        const rect =
            trashWindow.getBoundingClientRect();


        trashStartWidth =
            rect.width;


        trashStartHeight =
            rect.height;


        trashStartMouseX =
            event.clientX;


        trashStartMouseY =
            event.clientY;


        trashWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            trashWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// TRASH RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !trashIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            trashStartMouseX;


        const deltaY =
            event.clientY -
            trashStartMouseY;


        const newWidth =
            trashStartWidth +
            deltaX;


        const newHeight =
            trashStartHeight +
            deltaY;


        const width =
            Math.max(
                550,
                newWidth
            );


        const height =
            Math.max(
                350,
                newHeight
            );


        trashWindow.style.width =
            `${width}px`;


        trashWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// TRASH RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        trashIsResizing = false;


        trashWindow.classList.remove(
            "resizing"
        );

    }
);

// ==================================================
// TRASH TXT FILES
// ==================================================

function openTrashText(
    fileName
) {

    if (
        fileName === "aleatorio.txt"
    ) {

        openReadme(
            "aleatorio.txt",
            `https://www.youtube.com/watch?v=dQw4w9WgXcQ
`
        );

        return;

    }


    if (
        fileName === "minhapartedotrabalhodeingles.txt"
    ) {

        openReadme(
            "minhapartedotrabalhodeingles.txt",
            `Comeco com:

Bom dia gente, tudo bem? (apresento o grupo)

hoje vamos apresentar a nosso aplicativo
chamado HomeHero, ele foi inspirado no
ifood, mas ao inves de receber comida
voce recebe profissionais para reparar
canos, chuveiros e quase qualquer coisa
rapido, facil e barato.
`
        );

        return;

    }

}


// ==================================================
// TRASH IMAGE
// ==================================================

function openTrashImage() {

    openImageViewer(
        "assets/fotoaleatoria.jpg",
        "foto.jpg"
    );

}


// ==================================================
// TRASH PROJECT
// ==================================================

function openTrashProject() {

    openImageViewer(
        "assets/fotoaleatoria2.jpg",
        "foto2.jpg"
    );

}


// ==================================================
// TRASH MYSTERY
// ==================================================

function openTrashMystery() {

    openReadme(
        "ofgjareni.txt",
       `        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        Me contrata Me contrata Me contrata
        ...
        
        mas somente se quiser :)
`
    );

}

// ==================================================
// MENU BAR
// ==================================================

function toggleMenu(
    menuId
) {

    const menu =
        document.getElementById(
            menuId
        );


    if (
        !menu
    ) {
        return;
    }


    // Fecha todos os outros menus

    document
        .querySelectorAll(
            ".dropdown-menu"
        )
        .forEach(
            (otherMenu) => {

                if (
                    otherMenu !== menu
                ) {

                    otherMenu.classList.remove(
                        "active"
                    );

                }

            }
        );


    // Alterna o menu clicado

    menu.classList.toggle(
        "active"
    );

}


// ==================================================
// FECHAR MENUS AO CLICAR FORA
// ==================================================

document.addEventListener(
    "click",
    (event) => {

        if (
            !event.target.closest(
                ".menu-item-wrapper"
            )
        ) {

            document
                .querySelectorAll(
                    ".dropdown-menu"
                )
                .forEach(
                    (menu) => {

                        menu.classList.remove(
                            "active"
                        );

                    }
                );

        }

    }
);

// ==================================================
// ABOUT BICASOS
// ==================================================

const aboutBicasOSWindow =
    document.getElementById(
        "aboutBicasOSWindow"
    );

const aboutBicasOSHeader =
    document.getElementById(
        "aboutBicasOSHeader"
    );

let aboutBicasOSIsOpen = false;

let aboutBicasOSIsAnimating = false;

let aboutBicasOSIsMaximized = false;


let aboutBicasOSPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// OPEN ABOUT BICASOS
// ==================================================

function openAboutBicasOS() {

    if (
        aboutBicasOSIsAnimating
    ) {
        return;
    }


    if (
        aboutBicasOSIsOpen
    ) {

        bringToFront(
            aboutBicasOSWindow
        );

        return;

    }


    aboutBicasOSIsAnimating = true;


    aboutBicasOSWindow.style.display =
        "flex";


    aboutBicasOSWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // Posição inicial baseada
    // no botão da Apple

    const appleButton =
        document.querySelector(
            ".apple-button"
        );


    const iconRect =
        appleButton.getBoundingClientRect();

    const windowRect =
        aboutBicasOSWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const iconCenterX =
        iconRect.left +
        iconRect.width / 2;

    const iconCenterY =
        iconRect.top +
        iconRect.height / 2;


    aboutBicasOSWindow.style.setProperty(
        "--dock-x",
        `${iconCenterX - windowCenterX}px`
    );


    aboutBicasOSWindow.style.setProperty(
        "--dock-y",
        `${iconCenterY - windowCenterY}px`
    );


    void aboutBicasOSWindow.offsetWidth;


    aboutBicasOSWindow.classList.add(
        "opening"
    );


    bringToFront(
        aboutBicasOSWindow
    );


    aboutBicasOSIsOpen = true;


    setTimeout(() => {

        aboutBicasOSWindow.classList.remove(
            "opening"
        );


        aboutBicasOSIsAnimating = false;

    }, 450);

}


// ==================================================
// MINIMIZE ABOUT BICASOS
// ==================================================

function minimizeAboutBicasOS() {

    if (
        !aboutBicasOSIsOpen ||
        aboutBicasOSIsAnimating
    ) {
        return;
    }


    aboutBicasOSIsAnimating = true;


    const appleButton =
        document.querySelector(
            ".apple-button"
        );


    const iconRect =
        appleButton.getBoundingClientRect();

    const windowRect =
        aboutBicasOSWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const iconCenterX =
        iconRect.left +
        iconRect.width / 2;

    const iconCenterY =
        iconRect.top +
        iconRect.height / 2;


    aboutBicasOSWindow.style.setProperty(
        "--dock-x",
        `${iconCenterX - windowCenterX}px`
    );


    aboutBicasOSWindow.style.setProperty(
        "--dock-y",
        `${iconCenterY - windowCenterY}px`
    );


    aboutBicasOSWindow.classList.add(
        "minimizing"
    );


    setTimeout(() => {

        aboutBicasOSWindow.style.display =
            "none";


        aboutBicasOSWindow.classList.remove(
            "minimizing"
        );


        aboutBicasOSIsOpen = false;

        aboutBicasOSIsAnimating = false;

    }, 450);

}


// ==================================================
// CLOSE ABOUT BICASOS
// ==================================================

function closeAboutBicasOS() {

    if (
        !aboutBicasOSIsOpen ||
        aboutBicasOSIsAnimating
    ) {
        return;
    }


    aboutBicasOSIsAnimating = true;


    aboutBicasOSWindow.classList.add(
        "closing"
    );


    setTimeout(() => {

        aboutBicasOSWindow.style.display =
            "none";


        aboutBicasOSWindow.classList.remove(
            "closing"
        );


        aboutBicasOSIsOpen = false;

        aboutBicasOSIsAnimating = false;

    }, 250);

}


// ==================================================
// MAXIMIZE ABOUT BICASOS
// ==================================================

function toggleAboutBicasOSMaximize() {

    if (
        aboutBicasOSIsAnimating
    ) {
        return;
    }


    // =========================
    // RESTAURAR
    // =========================

    if (
        aboutBicasOSIsMaximized
    ) {

        aboutBicasOSWindow.classList.remove(
            "maximized"
        );


        aboutBicasOSWindow.style.left =
            aboutBicasOSPreviousState.left;


        aboutBicasOSWindow.style.top =
            aboutBicasOSPreviousState.top;


        aboutBicasOSWindow.style.width =
            aboutBicasOSPreviousState.width;


        aboutBicasOSWindow.style.height =
            aboutBicasOSPreviousState.height;


        aboutBicasOSIsMaximized = false;


        bringToFront(
            aboutBicasOSWindow
        );


        return;

    }


    // =========================
    // SALVAR ESTADO
    // =========================

    const rect =
        aboutBicasOSWindow.getBoundingClientRect();


    aboutBicasOSPreviousState.left =
        `${rect.left}px`;


    aboutBicasOSPreviousState.top =
        `${rect.top}px`;


    aboutBicasOSPreviousState.width =
        `${rect.width}px`;


    aboutBicasOSPreviousState.height =
        `${rect.height}px`;


    // =========================
    // CONVERTER POSIÇÃO
    // =========================

    aboutBicasOSWindow.style.left =
        `${rect.left}px`;


    aboutBicasOSWindow.style.top =
        `${rect.top}px`;


    aboutBicasOSWindow.style.width =
        `${rect.width}px`;


    aboutBicasOSWindow.style.height =
        `${rect.height}px`;


    void aboutBicasOSWindow.offsetWidth;


    // =========================
    // MAXIMIZAR
    // =========================

    aboutBicasOSWindow.classList.add(
        "maximized"
    );


    aboutBicasOSIsMaximized = true;


    bringToFront(
        aboutBicasOSWindow
    );

}


// ==================================================
// ABOUT BICASOS FOCUS
// ==================================================

aboutBicasOSWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            aboutBicasOSWindow
        );

    }
);


// ==================================================
// ABOUT BICASOS DRAG
// ==================================================

let aboutBicasOSIsDragging = false;

let aboutBicasOSOffsetX = 0;

let aboutBicasOSOffsetY = 0;


aboutBicasOSHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {
            return;
        }


        if (
            aboutBicasOSIsMaximized
        ) {
            return;
        }


        aboutBicasOSIsDragging = true;


        aboutBicasOSWindow.classList.add(
            "dragging"
        );


        const rect =
            aboutBicasOSWindow.getBoundingClientRect();


        aboutBicasOSOffsetX =
            event.clientX -
            rect.left;


        aboutBicasOSOffsetY =
            event.clientY -
            rect.top;


        aboutBicasOSWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        aboutBicasOSWindow.style.left =
            `${rect.left}px`;


        aboutBicasOSWindow.style.top =
            `${rect.top}px`;


        aboutBicasOSWindow.style.transform =
            "none";


        bringToFront(
            aboutBicasOSWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// ABOUT BICASOS DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !aboutBicasOSIsDragging
        ) {
            return;
        }


        aboutBicasOSWindow.style.left =
            `${event.clientX - aboutBicasOSOffsetX}px`;


        aboutBicasOSWindow.style.top =
            `${event.clientY - aboutBicasOSOffsetY}px`;

    }
);


// ==================================================
// ABOUT BICASOS DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        aboutBicasOSIsDragging = false;


        aboutBicasOSWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// ABOUT BICASOS RESIZE
// ==================================================

const aboutBicasOSResizeHandle =
    aboutBicasOSWindow.querySelector(
        ".resize-handle"
    );


let aboutBicasOSIsResizing = false;

let aboutBicasOSStartWidth = 0;

let aboutBicasOSStartHeight = 0;

let aboutBicasOSStartMouseX = 0;

let aboutBicasOSStartMouseY = 0;


aboutBicasOSResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            aboutBicasOSIsMaximized
        ) {
            return;
        }


        aboutBicasOSIsResizing = true;


        aboutBicasOSWindow.classList.add(
            "resizing"
        );


        const rect =
            aboutBicasOSWindow.getBoundingClientRect();


        aboutBicasOSStartWidth =
            rect.width;


        aboutBicasOSStartHeight =
            rect.height;


        aboutBicasOSStartMouseX =
            event.clientX;


        aboutBicasOSStartMouseY =
            event.clientY;


        aboutBicasOSWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            aboutBicasOSWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// ABOUT BICASOS RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !aboutBicasOSIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            aboutBicasOSStartMouseX;


        const deltaY =
            event.clientY -
            aboutBicasOSStartMouseY;


        const newWidth =
            aboutBicasOSStartWidth +
            deltaX;


        const newHeight =
            aboutBicasOSStartHeight +
            deltaY;


        const width =
            Math.max(
                400,
                newWidth
            );


        const height =
            Math.max(
                300,
                newHeight
            );


        aboutBicasOSWindow.style.width =
            `${width}px`;


        aboutBicasOSWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// ABOUT BICASOS RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        aboutBicasOSIsResizing = false;


        aboutBicasOSWindow.classList.remove(
            "resizing"
        );

    }
);

// ==================================================
// AJUDA DO BICASOS
// ==================================================

function openHelp() {

    openReadme(
        "TUTORIAL.txt",
        `==================================================
                 TUTORIAL.txt
                 BICASOS
==================================================

Bem-vindo ao BicasOS! 👋

Este arquivo explica como utilizar o sistema.

--------------------------------------------------
ÁREA DE TRABALHO
--------------------------------------------------

A área de trabalho contém arquivos e pastas
que podem ser abertos com dois cliques.

Dê um duplo clique em um arquivo ou pasta
para abrir seu conteúdo.

--------------------------------------------------
FINDER
--------------------------------------------------

O Finder permite navegar pelos arquivos e
pastas disponíveis no BicasOS.

Você pode abrir o Finder pelo Dock ou pelo
menu superior.

--------------------------------------------------
SPOTLIGHT
--------------------------------------------------

O Spotlight aparece quando é pressionado 
CTRL + ESPACO, ele serve para te ajudar a 
encontrar aplicativos facilmente.

--------------------------------------------------
DOCK
--------------------------------------------------

O Dock fica localizado na parte inferior da tela.

Nele você encontra os principais aplicativos
do BicasOS.

Clique em um aplicativo para abri-lo.

--------------------------------------------------
JANELAS
--------------------------------------------------

As janelas do BicasOS possuem três botões:

🔴 Fechar
Fecha a janela atual.

🟡 Minimizar
Esconde a janela.

🟢 Maximizar
Alterna entre o tamanho normal e maximizado.

Você também pode arrastar as janelas pela barra
superior e redimensioná-las pelo canto inferior.

--------------------------------------------------
MENU SUPERIOR
--------------------------------------------------

A barra superior contém diferentes menus.


Contém opções relacionadas ao BicasOS.

Finder
Acesso rápido ao Finder.

Arquivo
Opções relacionadas a arquivos.

Editar
Opções de edição.

Visualizar
Opções de visualização do sistema.

Ir
Atalhos para diferentes locais.

Janela
Acesso rápido às janelas abertas.

Ajuda
Informações e ajuda sobre o BicasOS.

--------------------------------------------------
DICA
--------------------------------------------------

Experimente usar 'help' no terminal para
comandos.

--------------------------------------------------

BicasOS 1.0
© 2026 BicasOS

==================================================`
    );

}

// ==================================================
// NOVO ARQUIVO
// ==================================================

let createdFiles = [];


// ==================================================
// CRIAR NOVO ARQUIVO
// ==================================================

function createNewFile() {

    const fileName =
        prompt(
            "Digite o nome do novo arquivo:"
        );


    // Cancelou

    if (
        fileName === null
    ) {
        return;
    }


    // Remove espaços desnecessários

    const cleanFileName =
        fileName.trim();


    // Nome vazio

    if (
        cleanFileName === ""
    ) {

        alert(
            "O arquivo precisa ter um nome."
        );

        return;

    }


    // ==================================================
    // VERIFICAR SE JÁ EXISTE
    // ==================================================

    const fileAlreadyExists =
        createdFiles.some(
            (file) =>
                file.name.toLowerCase() ===
                cleanFileName.toLowerCase() &&

                JSON.stringify(
                    file.path
                ) ===
                JSON.stringify(
                    finderCurrentPath
                )
        );


    if (
        fileAlreadyExists
    ) {

        alert(
            "Já existe um arquivo com esse nome."
        );

        return;

    }


    // ==================================================
    // CRIAR ARQUIVO
    // ==================================================

    createdFiles.push({

        name:
            cleanFileName,

        path:
            [...finderCurrentPath],

        type:
            "file"

    });


    // ==================================================
    // ATUALIZAR FINDER
    // ==================================================

    renderFinder();


    // Coloca o Finder na frente

    bringToFront(
        finderWindow
    );

}

// ==================================================
// RENDER ARQUIVOS CRIADOS
// ==================================================

function renderCreatedFiles() {

    return createdFiles
        .filter(
            (file) => {

                return (
                    JSON.stringify(
                        file.path
                    ) ===
                    JSON.stringify(
                        finderCurrentPath
                    )
                );

            }
        )
        .map(
            (file) => {

                return `

                    <div
                        class="finder-item created-file"
                        ondblclick="
                            openCreatedFile(
                                '${file.name.replace(
                                    /'/g,
                                    "\\'"
                                )}'
                            )
                        "
                    >

                        <img
                            src="assets/Icons/File_TXT_aExwB3ULuk_icns-35c206b21a_256x256x32.png"
                            alt="Arquivo"
                        >

                        <span>
                            ${file.name}
                        </span>

                    </div>

                `;

            }
        )
        .join("");

}

// ==================================================
// ABRIR ARQUIVO CRIADO
// ==================================================

function openCreatedFile(
    fileName
) {

    const file =
        createdFiles.find(
            (item) => {

                return (
                    item.name === fileName &&

                    JSON.stringify(
                        item.path
                    ) ===
                    JSON.stringify(
                        finderCurrentPath
                    )
                );

            }
        );


    if (
        !file
    ) {
        return;
    }


    // Por enquanto abre como TXT

    openReadme(
        file.name,
        ""
    );

}

// ==================================================
// PAINT
// ==================================================

const paintWindow =
    document.getElementById(
        "paintWindow"
    );

const paintHeader =
    document.getElementById(
        "paintHeader"
    );

const paintDockItem =
    document.getElementById(
        "paintDockItem"
    );

const paintCanvas =
    document.getElementById(
        "paintCanvas"
    );

const paintContent =
    paintWindow.querySelector(
        ".paint-content"
    );

const paintColor =
    document.getElementById(
        "paintColor"
    );

const paintBrushSize =
    document.getElementById(
        "paintBrushSize"
    );

const paintBrushSizeValue =
    document.getElementById(
        "paintBrushSizeValue"
    );

const paintPencilButton =
    document.getElementById(
        "paintPencilButton"
    );

const paintEraserButton =
    document.getElementById(
        "paintEraserButton"
    );

const paintUndoButton =
    document.getElementById(
        "paintUndoButton"
    );

const paintRedoButton =
    document.getElementById(
        "paintRedoButton"
    );


// ==================================================
// CANVAS
// ==================================================

const paintContext =
    paintCanvas.getContext(
        "2d"
    );


// ==================================================
// PAINT STATE
// ==================================================

let paintIsOpen =
    false;

let paintIsAnimating =
    false;

let paintIsMaximized =
    false;


// ==================================================
// PAINT WINDOW STATE
// ==================================================

let paintPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// PAINT DRAW STATE
// ==================================================

let paintIsDrawing =
    false;

let paintLastX =
    0;

let paintLastY =
    0;

let paintCurrentTool =
    "pencil";


// ==================================================
// PAINT HISTORY
// ==================================================

let paintHistory = [];

let paintHistoryIndex =
    -1;


// ==================================================
// PAINT DRAG STATE
// ==================================================

let paintIsDragging =
    false;

let paintOffsetX =
    0;

let paintOffsetY =
    0;


// ==================================================
// PAINT RESIZE STATE
// ==================================================

const paintResizeHandle =
    paintWindow.querySelector(
        ".resize-handle"
    );


let paintIsResizing =
    false;

let paintStartWidth =
    0;

let paintStartHeight =
    0;

let paintStartMouseX =
    0;

let paintStartMouseY =
    0;


// ==================================================
// PAINT DOCK POSITION
// ==================================================

function getPaintDockPosition() {

    const dockRect =
        paintDockItem.getBoundingClientRect();

    const windowRect =
        paintWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    return {

        x:
            dockCenterX -
            windowCenterX,

        y:
            dockCenterY -
            windowCenterY

    };

}


// ==================================================
// PREPARAR CANVAS
// ==================================================

function setupPaintCanvas() {

    const rect =
        paintContent.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {
        return;
    }


    paintCanvas.width =
        rect.width;

    paintCanvas.height =
        rect.height;


    paintContext.fillStyle =
        "#ffffff";


    paintContext.fillRect(
        0,
        0,
        paintCanvas.width,
        paintCanvas.height
    );

}


// ==================================================
// SALVAR ESTADO DO CANVAS
// ==================================================

function savePaintHistory() {

    if (
        paintHistoryIndex <
        paintHistory.length - 1
    ) {

        paintHistory =
            paintHistory.slice(
                0,
                paintHistoryIndex + 1
            );

    }


    paintHistory.push(
        paintCanvas.toDataURL()
    );


    paintHistoryIndex =
        paintHistory.length - 1;


    updatePaintHistoryButtons();

}


// ==================================================
// RESTAURAR ESTADO
// ==================================================

function restorePaintHistory(
    imageData
) {

    const image =
        new Image();


    image.onload =
        () => {

            paintContext.clearRect(
                0,
                0,
                paintCanvas.width,
                paintCanvas.height
            );


            paintContext.drawImage(
                image,
                0,
                0
            );

        };


    image.src =
        imageData;

}


// ==================================================
// ATUALIZAR BOTÕES
// ==================================================

function updatePaintHistoryButtons() {

    paintUndoButton.disabled =
        paintHistoryIndex <= 0;


    paintRedoButton.disabled =
        paintHistoryIndex >=
        paintHistory.length - 1;

}


// ==================================================
// SELECIONAR FERRAMENTA
// ==================================================

function selectPaintTool(
    tool
) {

    paintCurrentTool =
        tool;


    paintPencilButton.classList.remove(
        "active"
    );

    paintEraserButton.classList.remove(
        "active"
    );


    if (
        tool === "pencil"
    ) {

        paintPencilButton.classList.add(
            "active"
        );

    }


    if (
        tool === "eraser"
    ) {

        paintEraserButton.classList.add(
            "active"
        );

    }

}

// ==================================================
// PEGAR POSIÇÃO DO MOUSE NO CANVAS
// ==================================================

function getPaintMousePosition(
    event
) {

    const rect =
        paintCanvas.getBoundingClientRect();


    const scaleX =
        paintCanvas.width /
        rect.width;


    const scaleY =
        paintCanvas.height /
        rect.height;


    return {

        x:
            (
                event.clientX -
                rect.left
            ) *
            scaleX,

        y:
            (
                event.clientY -
                rect.top
            ) *
            scaleY

    };

}


// ==================================================
// COMEÇAR A DESENHAR
// ==================================================

paintCanvas.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.button !== 0
        ) {
            return;
        }


        paintIsDrawing =
            true;


        const position =
            getPaintMousePosition(
                event
            );


        paintLastX =
            position.x;

        paintLastY =
            position.y;


        paintContext.beginPath();


        paintContext.moveTo(
            paintLastX,
            paintLastY
        );


        paintContext.lineCap =
            "round";

        paintContext.lineJoin =
            "round";


        paintContext.lineWidth =
            paintBrushSize.value;


        if (
            paintCurrentTool ===
            "eraser"
        ) {

            paintContext.globalCompositeOperation =
                "destination-out";

        } else {

            paintContext.globalCompositeOperation =
                "source-over";


            paintContext.strokeStyle =
                paintColor.value;

        }


        event.preventDefault();

    }
);


// ==================================================
// DESENHAR
// ==================================================

paintCanvas.addEventListener(
    "mousemove",
    (event) => {

        if (
            !paintIsDrawing
        ) {
            return;
        }


        const position =
            getPaintMousePosition(
                event
            );


        paintContext.lineTo(
            position.x,
            position.y
        );


        paintContext.stroke();


        paintLastX =
            position.x;

        paintLastY =
            position.y;

    }
);


// ==================================================
// PARAR DE DESENHAR
// ==================================================

function stopPaintDrawing() {

    if (
        !paintIsDrawing
    ) {
        return;
    }


    paintIsDrawing =
        false;


    paintContext.closePath();


    paintContext.globalCompositeOperation =
        "source-over";


    savePaintHistory();

}


// ==================================================
// MOUSE UP
// ==================================================

paintCanvas.addEventListener(
    "mouseup",
    stopPaintDrawing
);


paintCanvas.addEventListener(
    "mouseleave",
    stopPaintDrawing
);


// ==================================================
// TAMANHO DO PINCEL
// ==================================================

paintBrushSize.addEventListener(
    "input",
    () => {

        paintBrushSizeValue.textContent =
            paintBrushSize.value;

    }
);


// ==================================================
// DESFAZER
// ==================================================

function undoPaint() {

    if (
        paintHistoryIndex <= 0
    ) {
        return;
    }


    paintHistoryIndex--;


    restorePaintHistory(
        paintHistory[
            paintHistoryIndex
        ]
    );


    updatePaintHistoryButtons();

}


// ==================================================
// REFAZER
// ==================================================

function redoPaint() {

    if (
        paintHistoryIndex >=
        paintHistory.length - 1
    ) {
        return;
    }


    paintHistoryIndex++;


    restorePaintHistory(
        paintHistory[
            paintHistoryIndex
        ]
    );


    updatePaintHistoryButtons();

}

// ==================================================
// LIMPAR PAINT
// ==================================================

function clearPaint() {

    paintContext.clearRect(
        0,
        0,
        paintCanvas.width,
        paintCanvas.height
    );


    // Atualiza o histórico
    savePaintState();

}


// ==================================================
// SALVAR PAINT
// ==================================================

function savePaint() {

    const link =
        document.createElement(
            "a"
        );


    link.download =
        "desenho.png";


    link.href =
        paintCanvas.toDataURL(
            "image/png"
        );


    link.click();

}


// ==================================================
// ABRIR PAINT
// ==================================================

function openPaint() {

    if (
        paintIsAnimating
    ) {
        return;
    }


    // ==================================================
    // JÁ ESTÁ ABERTO
    // ==================================================

    if (
        paintIsOpen
    ) {

        bringToFront(
            paintWindow
        );

        return;

    }


    paintIsAnimating =
        true;


    // ==================================================
    // MOSTRAR JANELA
    // ==================================================

    paintWindow.style.display =
        "flex";


    paintWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // ==================================================
    // POSIÇÃO DO DOCK
    // ==================================================

    const dockPosition =
        getPaintDockPosition();


    paintWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    paintWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // ==================================================
    // FORÇA REFLOW
    // ==================================================

    void paintWindow.offsetWidth;


    // ==================================================
    // ANIMAÇÃO
    // ==================================================

    paintWindow.classList.add(
        "opening"
    );


    bringToFront(
        paintWindow
    );


    paintIsOpen =
        true;


    // ==================================================
    // FINALIZAR
    // ==================================================

    setTimeout(
        () => {

            paintWindow.classList.remove(
                "opening"
            );


            paintIsAnimating =
                false;


            paintCanvas.focus();

        },
        450
    );

}


// ==================================================
// MINIMIZAR PAINT
// ==================================================

function minimizePaint() {

    if (
        !paintIsOpen ||
        paintIsAnimating
    ) {
        return;
    }


    paintIsAnimating =
        true;


    // ==================================================
    // POSIÇÃO DO DOCK
    // ==================================================

    const dockPosition =
        getPaintDockPosition();


    paintWindow.style.setProperty(
        "--dock-x",
        `${dockPosition.x}px`
    );


    paintWindow.style.setProperty(
        "--dock-y",
        `${dockPosition.y}px`
    );


    // ==================================================
    // ANIMAÇÃO
    // ==================================================

    paintWindow.classList.add(
        "minimizing"
    );


    setTimeout(
        () => {

            paintWindow.style.display =
                "none";


            paintWindow.classList.remove(
                "minimizing"
            );


            paintIsOpen =
                false;


            paintIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// FECHAR PAINT
// ==================================================

function closePaint() {

    if (
        !paintIsOpen ||
        paintIsAnimating
    ) {
        return;
    }


    paintIsAnimating =
        true;


    paintWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        paintWindow.style.display =
            "none";


        paintWindow.classList.remove(
            "closing"
        );


        paintIsOpen =
            false;


        paintIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "paintDockItem"
        );

    },
    250
);

}


// ==================================================
// MAXIMIZAR / RESTAURAR
// ==================================================

function togglePaintMaximize() {

    if (
        paintIsAnimating
    ) {
        return;
    }


    // ==================================================
    // RESTAURAR
    // ==================================================

    if (
        paintIsMaximized
    ) {

        paintWindow.classList.remove(
            "maximized"
        );


        paintWindow.style.left =
            paintPreviousState.left;


        paintWindow.style.top =
            paintPreviousState.top;


        paintWindow.style.width =
            paintPreviousState.width;


        paintWindow.style.height =
            paintPreviousState.height;


        paintIsMaximized =
            false;


        bringToFront(
            paintWindow
        );


        return;

    }


    // ==================================================
    // SALVAR ESTADO
    // ==================================================

    const rect =
        paintWindow.getBoundingClientRect();


    paintPreviousState.left =
        `${rect.left}px`;


    paintPreviousState.top =
        `${rect.top}px`;


    paintPreviousState.width =
        `${rect.width}px`;


    paintPreviousState.height =
        `${rect.height}px`;


    // ==================================================
    // CONVERTER POSIÇÃO
    // ==================================================

    paintWindow.style.left =
        `${rect.left}px`;


    paintWindow.style.top =
        `${rect.top}px`;


    paintWindow.style.width =
        `${rect.width}px`;


    paintWindow.style.height =
        `${rect.height}px`;


    void paintWindow.offsetWidth;


    // ==================================================
    // MAXIMIZAR
    // ==================================================

    paintWindow.classList.add(
        "maximized"
    );


    paintIsMaximized =
        true;


    bringToFront(
        paintWindow
    );

}


// ==================================================
// PAINT FOCUS
// ==================================================

paintWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            paintWindow
        );

    }
);


// ==================================================
// PAINT DRAG START
// ==================================================

paintHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.closest(
                ".window-button"
            )
        ) {
            return;
        }


        if (
            paintIsMaximized
        ) {
            return;
        }


        paintIsDragging =
            true;


        const rect =
            paintWindow.getBoundingClientRect();


        paintOffsetX =
            event.clientX -
            rect.left;


        paintOffsetY =
            event.clientY -
            rect.top;


        paintWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        paintWindow.classList.add(
            "dragging"
        );


        paintWindow.style.left =
            `${rect.left}px`;


        paintWindow.style.top =
            `${rect.top}px`;


        paintWindow.style.transform =
            "none";


        bringToFront(
            paintWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// PAINT DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !paintIsDragging
        ) {
            return;
        }


        paintWindow.style.left =
            `${event.clientX -
            paintOffsetX}px`;


        paintWindow.style.top =
            `${event.clientY -
            paintOffsetY}px`;

    }
);


// ==================================================
// PAINT DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        if (
            !paintIsDragging
        ) {
            return;
        }


        paintIsDragging =
            false;


        paintWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// PAINT RESIZE START
// ==================================================

paintResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            paintIsMaximized
        ) {
            return;
        }


        paintIsResizing =
            true;


        const rect =
            paintWindow.getBoundingClientRect();


        paintStartWidth =
            rect.width;


        paintStartHeight =
            rect.height;


        paintStartMouseX =
            event.clientX;


        paintStartMouseY =
            event.clientY;


        paintWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        paintWindow.classList.add(
            "resizing"
        );


        bringToFront(
            paintWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// PAINT RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !paintIsResizing
        ) {
            return;
        }


        const deltaX =
            event.clientX -
            paintStartMouseX;


        const deltaY =
            event.clientY -
            paintStartMouseY;


        const width =
            Math.max(
                500,
                paintStartWidth +
                deltaX
            );


        const height =
            Math.max(
                350,
                paintStartHeight +
                deltaY
            );


        paintWindow.style.width =
            `${width}px`;


        paintWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// PAINT RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        if (
            !paintIsResizing
        ) {
            return;
        }


        paintIsResizing =
            false;


        paintWindow.classList.remove(
            "resizing"
        );

    }
);


// ==================================================
// INICIALIZAR PAINT
// ==================================================

paintWindow.style.display =
    "none";


// ==================================================
// CRIAR CANVAS INICIAL
// ==================================================

window.addEventListener(
    "load",
    () => {

        setupPaintCanvas();


        savePaintHistory();

    }
);

// ==================================================
// CALCULATOR
// ==================================================

const calculatorWindow =
    document.getElementById(
        "calculatorWindow"
    );

const calculatorHeader =
    document.getElementById(
        "calculatorHeader"
    );

const calculatorDockItem =
    document.getElementById(
        "calculatorDockItem"
    );

const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


// ==================================================
// CALCULATOR STATE
// ==================================================

let calculatorIsOpen =
    false;

let calculatorIsAnimating =
    false;

let calculatorIsMaximized =
    false;


// ==================================================
// CALCULATOR PREVIOUS STATE
// ==================================================

let calculatorPreviousState = {

    left: null,

    top: null,

    width: null,

    height: null

};


// ==================================================
// CALCULATOR LOGIC STATE
// ==================================================

let calculatorCurrentValue =
    "0";

let calculatorPreviousValue =
    null;

let calculatorCurrentOperator =
    null;

let calculatorWaitingForOperand =
    false;

let calculatorResetAfterEquals =
    false;


// ==================================================
// CALCULATOR UPDATE DISPLAY
// ==================================================

function updateCalculatorDisplay() {

    calculatorDisplay.textContent =
        calculatorCurrentValue;

}


// ==================================================
// CALCULATOR INPUT NUMBER
// ==================================================

function calculatorNumber(
    number
) {

    // Se acabou de calcular
    if (
        calculatorResetAfterEquals
    ) {

        calculatorCurrentValue =
            number;

        calculatorResetAfterEquals =
            false;

        updateCalculatorDisplay();

        return;

    }


    // Se está esperando o próximo número
    if (
        calculatorWaitingForOperand
    ) {

        calculatorCurrentValue =
            number;

        calculatorWaitingForOperand =
            false;

    }

    // Substitui o zero inicial
    else if (
        calculatorCurrentValue ===
        "0"
    ) {

        calculatorCurrentValue =
            number;

    }

    // Adiciona o número
    else {

        calculatorCurrentValue +=
            number;

    }


    updateCalculatorDisplay();

}


// ==================================================
// DECIMAL
// ==================================================

function calculatorDecimal() {

    if (
        calculatorResetAfterEquals
    ) {

        calculatorCurrentValue =
            "0.";

        calculatorResetAfterEquals =
            false;

        updateCalculatorDisplay();

        return;

    }


    if (
        calculatorWaitingForOperand
    ) {

        calculatorCurrentValue =
            "0.";

        calculatorWaitingForOperand =
            false;

        updateCalculatorDisplay();

        return;

    }


    if (
        !calculatorCurrentValue.includes(
            "."
        )
    ) {

        calculatorCurrentValue +=
            ".";

    }


    updateCalculatorDisplay();

}


// ==================================================
// OPERATOR
// ==================================================

function calculatorOperator(
    operator
) {

    const currentValue =
        parseFloat(
            calculatorCurrentValue
        );


    if (
        calculatorPreviousValue !==
        null &&
        calculatorCurrentOperator !==
        null &&
        !calculatorWaitingForOperand
    ) {

        const result =
            calculateCalculatorResult(
                calculatorPreviousValue,
                currentValue,
                calculatorCurrentOperator
            );


        calculatorCurrentValue =
            formatCalculatorResult(
                result
            );

        calculatorPreviousValue =
            result;

    }

    else {

        calculatorPreviousValue =
            currentValue;

    }


    calculatorCurrentOperator =
        operator;

    calculatorWaitingForOperand =
        true;

    calculatorResetAfterEquals =
        false;


    updateCalculatorDisplay();

}


// ==================================================
// CALCULATE RESULT
// ==================================================

function calculateCalculatorResult(
    firstValue,
    secondValue,
    operator
) {

    switch (
        operator
    ) {

        case "+":

            return (
                firstValue +
                secondValue
            );


        case "-":

            return (
                firstValue -
                secondValue
            );


        case "*":

            return (
                firstValue *
                secondValue
            );


        case "/":

            if (
                secondValue ===
                0
            ) {

                return "Erro";

            }

            return (
                firstValue /
                secondValue
            );


        default:

            return secondValue;

    }

}


// ==================================================
// FORMAT RESULT
// ==================================================

function formatCalculatorResult(
    result
) {

    if (
        result ===
        "Erro"
    ) {

        return "Erro";

    }


    if (
        !Number.isFinite(
            result
        )
    ) {

        return "Erro";

    }


    return String(
        Number(
            result.toFixed(
                10
            )
        )
    );

}


// ==================================================
// EQUALS
// ==================================================

function calculatorEquals() {

    if (
        calculatorPreviousValue ===
        null ||
        calculatorCurrentOperator ===
        null
    ) {

        return;

    }


    const currentValue =
        parseFloat(
            calculatorCurrentValue
        );


    const result =
        calculateCalculatorResult(
            calculatorPreviousValue,
            currentValue,
            calculatorCurrentOperator
        );


    calculatorCurrentValue =
        formatCalculatorResult(
            result
        );


    calculatorPreviousValue =
        null;

    calculatorCurrentOperator =
        null;

    calculatorWaitingForOperand =
        false;

    calculatorResetAfterEquals =
        true;


    updateCalculatorDisplay();

}


// ==================================================
// CLEAR
// ==================================================

function calculatorClear() {

    calculatorCurrentValue =
        "0";

    calculatorPreviousValue =
        null;

    calculatorCurrentOperator =
        null;

    calculatorWaitingForOperand =
        false;

    calculatorResetAfterEquals =
        false;


    updateCalculatorDisplay();

}


// ==================================================
// TOGGLE SIGN
// ==================================================

function calculatorToggleSign() {

    if (
        calculatorCurrentValue ===
        "0"
    ) {

        return;

    }


    if (
        calculatorCurrentValue ===
        "Erro"
    ) {

        calculatorClear();

        return;

    }


    if (
        calculatorCurrentValue.startsWith(
            "-"
        )
    ) {

        calculatorCurrentValue =
            calculatorCurrentValue.substring(
                1
            );

    }

    else {

        calculatorCurrentValue =
            "-" +
            calculatorCurrentValue;

    }


    updateCalculatorDisplay();

}


// ==================================================
// PERCENT
// ==================================================

function calculatorPercent() {

    if (
        calculatorCurrentValue ===
        "Erro"
    ) {

        calculatorClear();

        return;

    }


    const value =
        parseFloat(
            calculatorCurrentValue
        );


    calculatorCurrentValue =
        formatCalculatorResult(
            value / 100
        );


    updateCalculatorDisplay();

}


// ==================================================
// OPEN CALCULATOR
// ==================================================

function openCalculator() {

    if (
        calculatorIsAnimating
    ) {

        return;

    }


    // Se já estiver aberto

    if (
        calculatorIsOpen
    ) {

        bringToFront(
            calculatorWindow
        );

        return;

    }


    calculatorIsAnimating =
        true;


    calculatorWindow.style.display =
        "flex";


    calculatorWindow.classList.remove(
        "closing",
        "minimizing"
    );


    // ==================================================
    // POSIÇÃO DO DOCK
    // ==================================================

    const dockRect =
        calculatorDockItem.getBoundingClientRect();


    const windowRect =
        calculatorWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    calculatorWindow.style.setProperty(
        "--dock-x",
        `${dockCenterX - windowCenterX}px`
    );


    calculatorWindow.style.setProperty(
        "--dock-y",
        `${dockCenterY - windowCenterY}px`
    );


    // ==================================================
    // FORÇA REFLOW
    // ==================================================

    void calculatorWindow.offsetWidth;


    // ==================================================
    // ANIMAÇÃO
    // ==================================================

    calculatorWindow.classList.add(
        "opening"
    );


    bringToFront(
        calculatorWindow
    );


    calculatorIsOpen =
        true;


    setTimeout(
        () => {

            calculatorWindow.classList.remove(
                "opening"
            );


            calculatorIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// MINIMIZE CALCULATOR
// ==================================================

function minimizeCalculator() {

    if (
        !calculatorIsOpen ||
        calculatorIsAnimating
    ) {

        return;

    }


    calculatorIsAnimating =
        true;


    // ==================================================
    // POSIÇÃO DO DOCK
    // ==================================================

    const dockRect =
        calculatorDockItem.getBoundingClientRect();


    const windowRect =
        calculatorWindow.getBoundingClientRect();


    const windowCenterX =
        windowRect.left +
        windowRect.width / 2;

    const windowCenterY =
        windowRect.top +
        windowRect.height / 2;


    const dockCenterX =
        dockRect.left +
        dockRect.width / 2;

    const dockCenterY =
        dockRect.top +
        dockRect.height / 2;


    calculatorWindow.style.setProperty(
        "--dock-x",
        `${dockCenterX - windowCenterX}px`
    );


    calculatorWindow.style.setProperty(
        "--dock-y",
        `${dockCenterY - windowCenterY}px`
    );


    calculatorWindow.classList.add(
        "minimizing"
    );


    setTimeout(
        () => {

            calculatorWindow.style.display =
                "none";


            calculatorWindow.classList.remove(
                "minimizing"
            );


            calculatorIsOpen =
                false;


            calculatorIsAnimating =
                false;

        },
        450
    );

}


// ==================================================
// CLOSE CALCULATOR
// ==================================================

function closeCalculator() {

    if (
        !calculatorIsOpen ||
        calculatorIsAnimating
    ) {

        return;

    }


    calculatorIsAnimating =
        true;


    calculatorWindow.classList.add(
        "closing"
    );


setTimeout(
    () => {

        calculatorWindow.style.display =
            "none";


        calculatorWindow.classList.remove(
            "closing"
        );


        calculatorIsOpen =
            false;


        calculatorIsAnimating =
            false;


        // Remove indicador do Dock

        setDockAppClosed(
            "calculatorDockItem"
        );

    },
    250
);

}


// ==================================================
// MAXIMIZE / RESTORE
// ==================================================

function toggleCalculatorMaximize() {

    if (
        calculatorIsAnimating
    ) {

        return;

    }


    // ==================================================
    // RESTAURAR
    // ==================================================

    if (
        calculatorIsMaximized
    ) {

        calculatorWindow.classList.remove(
            "maximized"
        );


        calculatorWindow.style.left =
            calculatorPreviousState.left;


        calculatorWindow.style.top =
            calculatorPreviousState.top;


        calculatorWindow.style.width =
            calculatorPreviousState.width;


        calculatorWindow.style.height =
            calculatorPreviousState.height;


        calculatorIsMaximized =
            false;


        bringToFront(
            calculatorWindow
        );


        return;

    }


    // ==================================================
    // SALVAR ESTADO
    // ==================================================

    const rect =
        calculatorWindow.getBoundingClientRect();


    calculatorPreviousState.left =
        `${rect.left}px`;


    calculatorPreviousState.top =
        `${rect.top}px`;


    calculatorPreviousState.width =
        `${rect.width}px`;


    calculatorPreviousState.height =
        `${rect.height}px`;


    // ==================================================
    // CONVERTER POSIÇÃO
    // ==================================================

    calculatorWindow.style.left =
        `${rect.left}px`;


    calculatorWindow.style.top =
        `${rect.top}px`;


    calculatorWindow.style.width =
        `${rect.width}px`;


    calculatorWindow.style.height =
        `${rect.height}px`;


    void calculatorWindow.offsetWidth;


    // ==================================================
    // MAXIMIZAR
    // ==================================================

    calculatorWindow.classList.add(
        "maximized"
    );


    calculatorIsMaximized =
        true;


    bringToFront(
        calculatorWindow
    );

}


// ==================================================
// CALCULATOR FOCUS
// ==================================================

calculatorWindow.addEventListener(
    "mousedown",
    () => {

        bringToFront(
            calculatorWindow
        );

    }
);


// ==================================================
// CALCULATOR DRAG
// ==================================================

let calculatorIsDragging =
    false;

let calculatorOffsetX =
    0;

let calculatorOffsetY =
    0;


calculatorHeader.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target.classList.contains(
                "window-button"
            )
        ) {

            return;

        }


        if (
            calculatorIsMaximized
        ) {

            return;

        }


        calculatorIsDragging =
            true;


        calculatorWindow.classList.add(
            "dragging"
        );


        const rect =
            calculatorWindow.getBoundingClientRect();


        calculatorOffsetX =
            event.clientX -
            rect.left;


        calculatorOffsetY =
            event.clientY -
            rect.top;


        calculatorWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        calculatorWindow.style.left =
            `${rect.left}px`;


        calculatorWindow.style.top =
            `${rect.top}px`;


        calculatorWindow.style.transform =
            "none";


        bringToFront(
            calculatorWindow
        );


        event.preventDefault();

    }
);


// ==================================================
// CALCULATOR DRAG MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !calculatorIsDragging
        ) {

            return;

        }


        calculatorWindow.style.left =
            `${event.clientX -
            calculatorOffsetX}px`;


        calculatorWindow.style.top =
            `${event.clientY -
            calculatorOffsetY}px`;

    }
);


// ==================================================
// CALCULATOR DRAG STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        calculatorIsDragging =
            false;


        calculatorWindow.classList.remove(
            "dragging"
        );

    }
);


// ==================================================
// CALCULATOR RESIZE
// ==================================================

const calculatorResizeHandle =
    calculatorWindow.querySelector(
        ".resize-handle"
    );


let calculatorIsResizing =
    false;

let calculatorStartWidth =
    0;

let calculatorStartHeight =
    0;

let calculatorStartMouseX =
    0;

let calculatorStartMouseY =
    0;


calculatorResizeHandle.addEventListener(
    "mousedown",
    (event) => {

        if (
            calculatorIsMaximized
        ) {

            return;

        }


        calculatorIsResizing =
            true;


        calculatorWindow.classList.add(
            "resizing"
        );


        const rect =
            calculatorWindow.getBoundingClientRect();


        calculatorStartWidth =
            rect.width;


        calculatorStartHeight =
            rect.height;


        calculatorStartMouseX =
            event.clientX;


        calculatorStartMouseY =
            event.clientY;


        calculatorWindow.classList.remove(
            "opening",
            "minimizing",
            "closing"
        );


        bringToFront(
            calculatorWindow
        );


        event.preventDefault();

        event.stopPropagation();

    }
);


// ==================================================
// CALCULATOR RESIZE MOVE
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !calculatorIsResizing
        ) {

            return;

        }


        const deltaX =
            event.clientX -
            calculatorStartMouseX;


        const deltaY =
            event.clientY -
            calculatorStartMouseY;


        const width =
            Math.max(
                300,
                calculatorStartWidth +
                deltaX
            );


        const height =
            Math.max(
                400,
                calculatorStartHeight +
                deltaY
            );


        calculatorWindow.style.width =
            `${width}px`;


        calculatorWindow.style.height =
            `${height}px`;

    }
);


// ==================================================
// CALCULATOR RESIZE STOP
// ==================================================

document.addEventListener(
    "mouseup",
    () => {

        calculatorIsResizing =
            false;


        calculatorWindow.classList.remove(
            "resizing"
        );

    }
);


// ==================================================
// CALCULATOR KEYBOARD
// ==================================================

document.addEventListener(
    "keydown",
    (event) => {

        // Só funciona se a Calculadora estiver aberta

        if (
            !calculatorIsOpen
        ) {

            return;

        }


        // Números

        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            calculatorNumber(
                event.key
            );

            return;

        }


        // Decimal

        if (
            event.key === "." ||
            event.key === ","
        ) {

            calculatorDecimal();

            return;

        }


        // Operadores

        if (
            event.key === "+" ||
            event.key === "-" ||
            event.key === "*" ||
            event.key === "/"
        ) {

            calculatorOperator(
                event.key
            );

            return;

        }


        // Enter / Igual

        if (
            event.key === "Enter" ||
            event.key === "="
        ) {

            calculatorEquals();

            return;

        }


        // Escape / Limpar

        if (
            event.key === "Escape"
        ) {

            calculatorClear();

            return;

        }


        // Backspace

        if (
            event.key === "Backspace"
        ) {

            if (
                calculatorCurrentValue.length >
                1
            ) {

                calculatorCurrentValue =
                    calculatorCurrentValue.slice(
                        0,
                        -1
                    );

            }

            else {

                calculatorCurrentValue =
                    "0";

            }


            updateCalculatorDisplay();

        }

    }
);


// ==================================================
// INITIAL DISPLAY
// ==================================================

updateCalculatorDisplay();

// ==================================================
// DOCK APP OPEN
// ==================================================

function setDockAppOpen(dockId) {

    const dockItem =
        document.getElementById(dockId);

    if (!dockItem) {
        return;
    }


    // Se já estiver aberto,
    // não faz a animação novamente

    if (
        dockItem.classList.contains(
            "app-open"
        )
    ) {

        return;

    }


    // Remove qualquer animação de saída

    dockItem.classList.remove(
        "app-closing"
    );


    // FORÇA o navegador a aplicar
    // o estado inicial fechado

    void dockItem.offsetWidth;


    // Agora inicia a expansão

    dockItem.classList.add(
        "app-open"
    );

}

// ==================================================
// DOCK APP CLOSED
// ==================================================

function setDockAppClosed(dockId) {

    const dockItem =
        document.getElementById(dockId);

    if (!dockItem) {
        return;
    }


    // Se já estiver fechado,
    // não faz nada

    if (
        !dockItem.classList.contains(
            "app-open"
        )
    ) {

        return;

    }


    // Inicia animação de saída

    dockItem.classList.add(
        "app-closing"
    );


    // Espera a animação terminar

    setTimeout(() => {

        dockItem.classList.remove(
            "app-open",
            "app-active",
            "app-closing"
        );

    }, 350);

}

// ==================================================
// DOCK ACTIVE APP
// ==================================================

function setDockActive(
    dockId
) {

    // Remove ativo de todos

    document
        .querySelectorAll(
            ".dock-item"
        )
        .forEach(
            (dockItem) => {

                dockItem.classList.remove(
                    "app-active"
                );

            }
        );


    // Pega o Dock do app

    const dockItem =
        document.getElementById(
            dockId
        );


    if (
        !dockItem
    ) {

        return;

    }


    // Garante que está aberto

    dockItem.classList.add(
        "app-open"
    );


    // Define como ativo

    dockItem.classList.add(
        "app-active"
    );

}

// ==================================================
// SPOTLIGHT
// ==================================================

const spotlight =
    document.getElementById(
        "spotlight"
    );


const spotlightInput =
    document.getElementById(
        "spotlightInput"
    );


const spotlightResults =
    document.getElementById(
        "spotlightResults"
    );

    console.log({
    spotlight,
    spotlightInput,
    spotlightResults
    });


// ==================================================
// ESTADO
// ==================================================

let spotlightIsOpen =
    false;

let spotlightSelectedIndex =
    0;


// ==================================================
// ABRIR SPOTLIGHT
// ==================================================

function openSpotlight() {

    if (
        spotlightIsOpen
    ) {

        return;

    }


    spotlightIsOpen =
        true;


    spotlight.classList.add(
        "open"
    );


    spotlightInput.value =
        "";


    spotlightSelectedIndex =
        0;


    updateSpotlightResults();


    // Foca no input

    setTimeout(() => {

        spotlightInput.focus();

    }, 50);

}


// ==================================================
// FECHAR SPOTLIGHT
// ==================================================

function closeSpotlight() {

    if (
        !spotlightIsOpen
    ) {

        return;

    }


    spotlightIsOpen =
        false;


    spotlight.classList.remove(
        "open"
    );


    spotlightInput.blur();

}


// ==================================================
// TOGGLE SPOTLIGHT
// ==================================================

function toggleSpotlight() {

    if (
        spotlightIsOpen
    ) {

        closeSpotlight();

    } else {

        openSpotlight();

    }

}


// ==================================================
// TECLADO
// ==================================================

document.addEventListener(
    "keydown",
    (event) => {


        // =========================
        // CTRL + ESPAÇO
        // =========================

        if (
            event.ctrlKey &&
            event.code === "Space"
        ) {

            event.preventDefault();

            toggleSpotlight();

            return;

        }


        // =========================
        // COMMAND + ESPAÇO
        // =========================

        if (
            event.metaKey &&
            event.code === "Space"
        ) {

            event.preventDefault();

            toggleSpotlight();

            return;

        }


        // =========================
        // SE SPOTLIGHT FECHADO
        // =========================

        if (
            !spotlightIsOpen
        ) {

            return;

        }


        // =========================
        // ESC
        // =========================

        if (
            event.key === "Escape"
        ) {

            closeSpotlight();

            return;

        }


        // =========================
        // SETA PARA BAIXO
        // =========================

        if (
            event.key === "ArrowDown"
        ) {

            event.preventDefault();


            const results =
                getSpotlightResults();


            if (
                results.length === 0
            ) {

                return;

            }


            spotlightSelectedIndex++;


            if (
                spotlightSelectedIndex >=
                results.length
            ) {

                spotlightSelectedIndex =
                    0;

            }


            updateSpotlightSelection();

            return;

        }


        // =========================
        // SETA PARA CIMA
        // =========================

        if (
            event.key === "ArrowUp"
        ) {

            event.preventDefault();


            const results =
                getSpotlightResults();


            if (
                results.length === 0
            ) {

                return;

            }


            spotlightSelectedIndex--;


            if (
                spotlightSelectedIndex < 0
            ) {

                spotlightSelectedIndex =
                    results.length - 1;

            }


            updateSpotlightSelection();

            return;

        }


        // =========================
        // ENTER
        // =========================

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();


            const results =
                getSpotlightResults();


            if (
                results.length === 0
            ) {

                return;

            }


            const selectedResult =
                results[
                    spotlightSelectedIndex
                ];


            selectedResult.click();

        }

    }
);


// ==================================================
// PESQUISA
// ==================================================

spotlightInput.addEventListener(
    "input",
    () => {

        spotlightSelectedIndex =
            0;


        updateSpotlightResults();

    }
);


// ==================================================
// PEGAR RESULTADOS
// ==================================================

function getSpotlightResults() {

    return Array.from(
        spotlightResults.querySelectorAll(
            ".spotlight-result"
        )
    ).filter(
        (result) => {

            return (
                result.style.display !==
                "none"
            );

        }
    );

}


// ==================================================
// ATUALIZAR RESULTADOS
// ==================================================

function updateSpotlightResults() {

    const search =
        spotlightInput.value
            .toLowerCase()
            .trim();


    const results =
        spotlightResults.querySelectorAll(
            ".spotlight-result"
        );


    results.forEach(
        (result) => {


            const appName =
                result.dataset.app
                    .toLowerCase();


            const title =
                result.querySelector(
                    ".spotlight-result-title"
                );


            const titleText =
                title
                    ? title.textContent
                        .toLowerCase()
                    : "";


            const matches =
                appName.includes(
                    search
                ) ||
                titleText.includes(
                    search
                );


            if (
                matches
            ) {

                result.style.display =
                    "flex";

            } else {

                result.style.display =
                    "none";

            }

        }
    );


    spotlightSelectedIndex =
        0;


    updateSpotlightSelection();

}


// ==================================================
// ATUALIZAR SELEÇÃO
// ==================================================

function updateSpotlightSelection() {

    const results =
        getSpotlightResults();


    results.forEach(
        (result, index) => {

            result.classList.toggle(
                "selected",
                index ===
                spotlightSelectedIndex
            );

        }
    );


    const selected =
        results[
            spotlightSelectedIndex
        ];


    if (
        selected
    ) {

        selected.scrollIntoView(
            {
                block:
                    "nearest"
            }
        );

    }

}


// ==================================================
// FECHAR AO CLICAR FORA
// ==================================================

document.addEventListener(
    "mousedown",
    (event) => {

        if (
            !spotlightIsOpen
        ) {

            return;

        }


        if (
            spotlight.contains(
                event.target
            )
        ) {

            return;

        }


        closeSpotlight();

    }
);