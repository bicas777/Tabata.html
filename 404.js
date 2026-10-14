/**
 * 404 Terminal - Full-screen terminal with functional commands
 * Inspired by macOS/Linux terminal, with Claude Code aesthetic
 */

(function() {
  'use strict';

  // State
  const state = {
    history: [],
    historyIndex: -1,
    autocompleteIndex: -1,
    autocompleteVisible: false,
    helpVisible: false,
    commands: {}
  };

  // DOM Elements
  const elements = {};

  // Command Definitions
  const commands = {
    neofetch: {
      description: 'Exibe informações do sistema',
      usage: 'neofetch',
      execute: () => {
        const output = [
          '<div class="neofetch-container">',
          '  <img src="assets/neofetch.png" alt="Portfolio" class="neofetch-image" />',
          '  <div class="neofetch-info">',
          '    <span class="terminal__line--muted">enzo@portfolio</span>',
          '    <span class="terminal__line--muted">------------</span>',
          '    <span class="terminal__line--muted">OS: ERROR 404</span>',
          '    <span class="terminal__line--muted">Host: ERROR 404</span>',
          '    <span class="terminal__line--muted">Kernel: ERROR 404</span>',
          '    <span class="terminal__line--muted">Uptime: ERROR 404</span>',
          '    <span class="terminal__line--muted">Packages: ERROR 404</span>',
          '    <span class="terminal__line--muted">Shell: ERROR 404</span>',
          '    <span class="terminal__line--muted">Resolution: ERROR 404</span>',
          '    <span class="terminal__line--muted">Theme: ERROR 404</span>',
          '    <span class="terminal__line--muted">Terminal: ERROR 404</span>',
          '    <span class="terminal__line--muted">CPU: ERROR 404</span>',
          '    <span class="terminal__line--muted">GPU: ERROR 404</span>',
          '    <span class="terminal__line--muted">Memory: ERROR 404</span>',
          '    <span class="terminal__line--muted">Disk: ERROR 404</span>',
          '  </div>',
          '</div>',
          ''
        ];
        return { lines: output, type: 'output', isHTML: true };
      }
    },

    help: {
      description: 'Mostra esta ajuda',
      usage: 'help [comando]',
      execute: (args) => {
        if (args.length > 0 && state.commands[args[0]]) {
          const cmd = state.commands[args[0]];
          return {
            lines: [
              `<span class="terminal__line--command">${cmd.usage}</span>`,
              cmd.description,
              ''
            ],
            type: 'output'
          };
        }

        const output = [
          '<span class="terminal__line--command">Comandos disponíveis:</span>',
          ''
        ];

        Object.entries(state.commands).forEach(([name, cmd]) => {
          output.push(`  <span class="terminal__line--command">${name}</span>  ${cmd.description}`);
        });

        output.push('');
        output.push('<span class="terminal__line--muted">Use Tab para autocompletar | ↑/↓ para histórico</span>');

        return { lines: output, type: 'output' };
      }
    },

    clear: {
      description: 'Limpa o terminal',
      usage: 'clear',
      execute: () => {
        const output = document.getElementById('terminalOutput');
        if (output) output.innerHTML = '';
        return { lines: [], type: 'clear' };
      }
    },

    pwd: {
      description: 'Diretório atual',
      usage: 'pwd',
      execute: () => {
        return { lines: ['/home/enzo/portfolio'], type: 'output' };
      }
    },

    whoami: {
      description: 'Usuário atual',
      usage: 'whoami',
      execute: () => {
        return { lines: ['Oi! Sou o Enzo Bicalho, prazer em conhecer.'], type: 'output' };
      }
    },

    date: {
      description: 'Data e hora atual',
      usage: 'date',
      execute: () => {
        return { lines: [new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })], type: 'output' };
      }
    },

    ls: {
      description: 'Lista diretórios',
      usage: 'ls [-la] [caminho]',
      execute: (args) => {
        const items = [
          { name: 'projects', type: 'dir', color: 'var(--accent)' },
          { name: 'assets', type: 'dir', color: 'var(--accent)' },
          { name: 'scripts', type: 'dir', color: 'var(--accent)' },
          { name: 'README.md', type: 'file', color: 'var(--fg)' },
          { name: 'package.json', type: 'file', color: 'var(--fg)' },
          { name: '.gitignore', type: 'file', color: 'var(--fg-muted)' }
        ];

        const output = items.map(item =>
          `<span style="color: ${item.color}">${item.name}</span>`
        );

        return { lines: output, type: 'output' };
      }
    },

    echo: {
      description: 'Imprime texto',
      usage: 'echo <texto>',
      execute: (args) => {
        return { lines: [args.join(' ')], type: 'output' };
      }
    },

    cat: {
      description: 'Mostra conteúdo do arquivo',
      usage: 'cat <arquivo>',
      execute: (args) => {
        if (args.length === 0) {
          return { lines: ['cat: arquivo não especificado'], type: 'error' };
        }

        const files = {
          'README.md': '# Portfolio 2.0\n\nERROR 404.',
          'package.json': '{\n  "name": "portfolio-2.0",\n  "version": "2.0.0",\n  "private": true\n}',
          '.gitignore': 'node_modules/\ndist/\n.env\n*.log'
        };

        const file = args[0];
        if (files[file]) {
          return { lines: files[file].split('\n'), type: 'output' };
        }

        return { lines: [`cat: ${file}: Arquivo ou diretório não encontrado`], type: 'error' };
      }
    },

    man: {
      description: 'Manual do comando',
      usage: 'man <comando>',
      execute: (args) => {
        if (args.length === 0) {
          return { lines: ['man: comando não especificado'], type: 'error' };
        }

        const cmd = state.commands[args[0]];
        if (!cmd) {
          return { lines: [`man: nenhuma entrada para ${args[0]}`], type: 'error' };
        }

        return {
          lines: [
            `<span class="terminal__line--command">${cmd.usage}</span>`,
            cmd.description,
            ''
          ],
          type: 'output'
        };
      }
    },

    history: {
      description: 'Histórico de comandos',
      usage: 'history',
      execute: () => {
        if (state.history.length === 0) {
          return { lines: ['(historico vazio)'], type: 'output' };
        }
        return {
          lines: state.history.map((cmd, i) => `  ${i + 1}  ${cmd}`),
          type: 'output'
        };
      }
    },

    exit: {
      description: 'Fecha o terminal (recarrega página)',
      usage: 'exit',
      execute: () => {
        window.location.reload();
        return { lines: [], type: 'exit' };
      }
    }
  };

  // Autocomplete Data
  const autocompleteData = [
    'neofetch', 'help', 'clear', 'pwd', 'whoami', 'date', 'ls', 'echo', 'cat', 'man', 'history', 'exit',
    'pwd', 'whoami', 'date', 'ls', 'echo', 'cat', 'man', 'history', 'exit',
    'README.md', 'package.json', '.gitignore', 'projects', 'assets', 'scripts'
  ];

  // Initialize DOM Elements
  function cacheElements() {
    elements.terminal = document.getElementById('terminal');
    elements.terminalBody = document.getElementById('terminalBody');
    elements.terminalOutput = document.getElementById('terminalOutput');
    state.terminalOutput = document.getElementById('terminalOutput');
    elements.terminalInput = document.getElementById('terminalInput');
    elements.prompt = document.getElementById('prompt');
    elements.cursor = document.getElementById('cursor');
    elements.terminalHelp = document.getElementById('terminalHelp');
    elements.helpToggle = document.querySelector('.terminal__help-toggle');
  }

  // Render Output
  function renderOutput(result) {
    const output = document.getElementById('terminalOutput');
    if (!output) return;

    if (result.type === 'clear') {
      output.innerHTML = '';
      return;
    }

    if (result.isHTML) {
      // Insere todo o HTML de uma vez, preservando a estrutura
      output.insertAdjacentHTML('beforeend', result.lines.join(''));
    } else if (result.lines && result.lines.length > 0) {
      result.lines.forEach(line => {
        const div = document.createElement('div');
        div.className = `terminal__line terminal__line--${result.type || 'output'}`;
        div.innerHTML = line;
        output.appendChild(div);
      });
    }

    output.scrollTop = output.scrollHeight;
  }

  // Add Command to History
  function addToHistory(cmd) {
    state.history.push(cmd);
    state.historyIndex = state.history.length;
  }

  // Show Welcome Message with 404 ASCII Art
  function showWelcome() {
    const output = document.getElementById('terminalOutput');
    if (!output) return;

    const welcomeLines = [
      '',
      '██╗  ██╗ ██████╗ ██╗  ██╗',
      '██║  ██║██╔═████╗██║  ██║',
      '███████║██║██╔██║███████║',
      '╚════██║████╔╝██║╚════██║',
      '     ██║╚██████╔╝     ██║',
      '     ╚═╝ ╚═════╝      ╚═╝',
      '                         ',
      '',
      '<span class="terminal__line--muted">Página não encontrada (404)</span>',
      '<span class="terminal__line--muted">Digite <span class="terminal__line--command">help</span> para ver comandos</span>',
      '<span class="terminal__line--muted">Digite <span class="terminal__line--command">neofetch</span> para info do sistema</span>',
      '<span class="terminal__line--muted">Use <kbd>Tab</kbd> para autocompletar | <kbd>↑/↓</kbd> para histórico</span>',
      ''
    ];

    welcomeLines.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'terminal__line terminal__line--muted';

      // ASCII art lines (first 7 lines) get monospace font
      if (index < 7) {
        div.style.fontFamily = 'var(--font-space)';
        div.style.lineHeight = '1.15';
      }

      div.innerHTML = line;
      state.terminalOutput.appendChild(div);
    });
  }

  // Autocomplete
  function showAutocomplete(inputValue) {
    if (!state.autocompleteVisible) return;

    // Remove existing
    const existing = document.querySelector('.autocomplete');
    if (existing) existing.remove();

    const input = document.getElementById('terminalInput');
    const value = inputValue.toLowerCase().trim();
    if (!value) return;

    const matches = autocompleteData.filter(cmd => cmd.toLowerCase().startsWith(value));
    if (matches.length === 0) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete visible';

    matches.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = 'autocomplete__item';
      item.dataset.value = cmd;
      item.innerHTML = `<code>${cmd}</code>`;
      item.addEventListener('click', () => {
        document.getElementById('terminalInput').value = cmd;
        hideAutocomplete();
        document.getElementById('terminalInput').focus();
      });
      dropdown.appendChild(item);
    });

    document.querySelector('.terminal__input-line').appendChild(dropdown);
    state.autocompleteVisible = true;
    state.autocompleteIndex = -1;
  }

  function hideAutocomplete() {
    const existing = document.querySelector('.autocomplete');
    if (existing) existing.remove();
    state.autocompleteVisible = false;
    state.autocompleteIndex = -1;
  }

  function navigateAutocomplete(direction) {
    const items = document.querySelectorAll('.autocomplete__item');
    if (items.length === 0) return;

    state.autocompleteIndex = (state.autocompleteIndex + direction + items.length) % items.length;

    items.forEach((item, i) => {
      item.classList.toggle('selected', i === state.autocompleteIndex);
    });

    if (state.autocompleteIndex >= 0) {
      items[state.autocompleteIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function selectAutocomplete() {
    const items = document.querySelectorAll('.autocomplete__item');
    if (state.autocompleteIndex >= 0 && state.autocompleteIndex < items.length) {
      const value = items[state.autocompleteIndex].dataset.value;
      document.getElementById('terminalInput').value = value;
      hideAutocomplete();
      document.getElementById('terminalInput').focus();
    }
  }

  // Help Toggle
  function toggleHelp() {
    state.helpVisible = !state.helpVisible;
    const help = document.getElementById('terminalHelp');
    if (help) {
      help.classList.toggle('visible', state.helpVisible);
    }
  }

  // Execute Command
  function executeCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    addToHistory(trimmed);

    // Render command line
    if (state.terminalOutput) {
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal__line terminal__line--prompt';
      cmdLine.innerHTML = `<span class="terminal__prompt">enzo@portfolio:~$</span><span class="terminal__line--command">${trimmed}</span>`;
      state.terminalOutput.appendChild(cmdLine);
    }

    // Parse command
    const parts = trimmed.split(' ').filter(Boolean);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Check command
    const cmd = state.commands[cmdName];
    if (!cmd) {
      renderOutput({
        lines: [`<span class="terminal__line--error">comando não encontrado: ${cmdName}</span>`, '<span class="terminal__line--muted">Digite "help" para ver comandos disponíveis</span>'],
        type: 'error'
      });
      return;
    }

    // Execute
    try {
      const result = cmd.execute(args);
      renderOutput(result);

      if (result.type === 'exit') {
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (e) {
      renderOutput({
        lines: [`<span class="terminal__line--error">Erro: ${e.message}</span>`],
        type: 'error'
      });
    }
  }

  // Input Handling
  function setupInput() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    const terminal = document.getElementById('terminal');

    if (!input || !output || !terminal) {
      console.error('[404 Terminal] Elementos não encontrados');
      return;
    }

    // Focus input on click anywhere in terminal
    terminal.addEventListener('click', (e) => {
      if (e.target.closest('.terminal__help') || e.target.closest('.terminal__help-toggle')) return;
      input.focus({ preventScroll: true });
    });

    // Input events
    input.addEventListener('input', (e) => {
      const value = e.target.value;

      // Show autocomplete
      if (state.autocompleteVisible) {
        showAutocomplete(e.target.value);
      } else if (value.includes(' ')) {
        showAutocomplete(value.split(' ').pop());
      }
    });

    // Keydown events
    input.addEventListener('keydown', (e) => {
      // Tab - Autocomplete
      if (e.key === 'Tab') {
        e.preventDefault();
        if (state.autocompleteVisible) {
          selectAutocomplete();
        } else {
          showAutocomplete(input.value.split(' ').pop());
        }
        return;
      }

      // Arrow Up/Down - History
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.historyIndex > 0) {
          state.historyIndex--;
          input.value = state.history[state.historyIndex];
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          input.value = state.history[state.historyIndex] || '';
        } else {
          state.historyIndex = state.history.length;
          input.value = '';
        }
        return;
      }

      // Enter - Execute
      if (e.key === 'Enter') {
        e.preventDefault();
        const inputValue = input.value;
        input.value = '';
        hideAutocomplete();
        executeCommand(inputValue);
        return;
      }

      // Escape - Clear/Clear Autocomplete
      if (e.key === 'Escape') {
        if (state.autocompleteVisible) {
          hideAutocomplete();
        } else {
          input.value = '';
        }
        return;
      }

      // Arrow Up/Down in Autocomplete
      if (state.autocompleteVisible && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        navigateAutocomplete(e.key === 'ArrowUp' ? -1 : 1);
        return;
      }
    });

    // Focus management
    input.addEventListener('focus', () => {
      const cursor = document.getElementById('cursor');
      if (cursor) cursor.style.display = 'inline-block';
    });

    input.addEventListener('blur', () => {
      const cursor = document.getElementById('cursor');
      if (cursor) cursor.style.display = 'none';
    });

    // Click anywhere in terminal focuses input
    terminal.addEventListener('click', (e) => {
      if (e.target.closest('.terminal__help') || e.target.closest('.terminal__help-toggle')) return;
      input.focus({ preventScroll: true });
    });

    // Ensure input is focusable
    input.tabIndex = 0;
  }

  // Help Toggle
  function setupHelpToggle() {
    const toggle = document.querySelector('.terminal__help-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleHelp);
    }
  }

  // Initialize
  function init() {
    cacheElements();
    state.commands = commands;
    setupInput();
    setupHelpToggle();
    showWelcome();

    // Focus input - multiple attempts for reliability
    const focusInput = () => {
      const input = document.getElementById('terminalInput');
      if (input) {
        input.focus({ preventScroll: true });
        input.select();
      }
    };

    // Multiple attempts for focus
    setTimeout(focusInput, 50);
    setTimeout(focusInput, 150);
    setTimeout(focusInput, 300);

    // Also try on first user interaction
    document.addEventListener('click', () => {
      const input = document.getElementById('terminalInput');
      if (input && document.activeElement !== input) {
        input.focus();
      }
    }, { once: true });

    console.log('[404 Terminal] Iniciado');
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();