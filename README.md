# 🎮 OtPokemon Dungeon Puzzle Trainer

Simulador do puzzle de dungeon do jogo OtPokemon. Este projeto permite que os jogadores pratiquem e aprimorem suas estratégias para completar o puzzle com o menor número de movimentos possível antes de enfrentar o desafio real no jogo.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## 🎯 Sobre o Projeto

Este é um puzzle deslizante que faz parte de uma dungeon do jogo **OtPokemon**. O objetivo deste projeto é fornecer aos jogadores uma plataforma para:

- ✅ Testar e entender a mecânica do puzzle antes de jogar
- 🧠 Desenvolver estratégias para completar com menos movimentos
- 🏃 Praticar para melhorar o tempo de conclusão
- 📈 Acompanhar seu progresso e estatísticas

## ✨ Características

- 🎯 **2 Modos de Dificuldade**: Normal (16 movimentos) e Difícil (14 movimentos)
- ⏱️ **Sistema de Timer**: Cronômetro que inicia no primeiro movimento
- 🏆 **Sistema de Streak**: Acompanhe suas vitórias consecutivas
- 📊 **Estatísticas Persistentes**: Melhor tempo e total de vitórias por dificuldade
- 🎨 **Puzzle 3x3**: Uma imagem dividida em 9 peças para reorganizar
- 🔊 **Efeitos Sonoros**: Som de troca de peças e som de vitória com opção de mute
- 🎊 **Animações**: Confetes na vitória e animações suaves de troca
- 📱 **Responsivo**: Interface adaptável para desktop e mobile
- 💾 **LocalStorage**: Progresso e configurações salvos localmente
- 🎮 **Controles Intuitivos**: Arraste e solte (drag & drop) para trocar peças

## 🚀 Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) com App Router
- **UI Library**: [React 19](https://react.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [TailwindCSS 4](https://tailwindcss.com/)
- **Otimização**: React Compiler (Babel Plugin)

## 📋 Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sliding-puzzle-game.git
cd sliding-puzzle-game/slindingame
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria a build de produção
npm start        # Inicia o servidor de produção
```

## 🎮 Como Jogar

1. **Selecione a Dificuldade**: Escolha entre Normal (16 movimentos) ou Difícil (14 movimentos)
2. **Observe o Modelo**: O grid da esquerda mostra como o puzzle deve ficar
3. **Reorganize as Peças**: Arraste e solte as peças adjacentes no grid da direita
4. **Complete o Puzzle**: Organize todas as peças antes de acabarem os movimentos
5. **Acompanhe seu Progresso**: Veja seu tempo, streak e melhor tempo

### Controles

- **Mouse**: Clique e arraste uma peça para uma posição adjacente
- **Touch**: Toque e arraste em dispositivos móveis
- **Embaralhar**: Gera um novo puzzle mantendo o mesmo modelo
- **Resetar**: Reinicia completamente o jogo (novo modelo e puzzle)
- **Mute**: Liga/desliga os efeitos sonoros

## 🏗️ Estrutura do Projeto

```
slindingame/
├── public/
│   ├── puzzle1.png - puzzle9.png    # 9 peças que compõem o puzzle
│   ├── slidingGame-slideRock.mp3    # Som de troca de peças
│   └── WinSound.wav                 # Som de vitória
├── src/
│   ├── app/
│   │   ├── globals.css              # Estilos globais
│   │   ├── layout.tsx               # Layout principal
│   │   └── page.tsx                 # Página principal do jogo
│   ├── components/
│   │   ├── Confetti.tsx             # Animação de confetes
│   │   ├── ConfirmModal.tsx         # Modal de confirmação
│   │   ├── DifficultySelector.tsx   # Seletor de dificuldade
│   │   ├── GameTitle.tsx            # Título do jogo
│   │   ├── MovesBar.tsx             # Barra de movimentos
│   │   ├── MuteButton.tsx           # Botão de mute
│   │   ├── PixelIcons.tsx           # Ícones pixelados
│   │   ├── PuzzleGrid.tsx           # Grid do puzzle
│   │   ├── ResetButton.tsx          # Botão de reset
│   │   ├── StatsBar.tsx             # Barra de estatísticas
│   │   └── StatusMessage.tsx        # Mensagem de status
│   └── hooks/
│       ├── useGameLogic.ts          # Lógica principal do jogo
│       ├── useImages.ts             # Carregamento de imagens
│       ├── useSound.ts              # Sistema de som
│       ├── useTimer.ts              # Cronômetro
│       └── useWinCounter.ts         # Sistema de vitórias
├── package.json
└── tsconfig.json
```

## 🎨 Customização

### Substituir Imagem do Puzzle

1. Divida sua imagem em 9 peças (3x3)
2. Substitua os arquivos `puzzle1.png` até `puzzle9.png` na pasta `public/`

### Ajustar Dificuldade

Edite o objeto `DIFFICULTY_MOVES` em `src/hooks/useGameLogic.ts`:

```typescript
export const DIFFICULTY_MOVES: Record<Difficulty, number> = {
  normal: 16,  // Número de movimentos permitidos
  hard: 14,
};
```

### Modificar Grid

Altere a constante `GRID_SIZE` em `src/hooks/useGameLogic.ts`:

```typescript
const GRID_SIZE = 3; // 3x3 grid (9 peças)
```

## 🧩 Funcionalidades Técnicas

### Custom Hooks

- **useGameLogic**: Gerencia estado do jogo, validação de movimentos e detecção de vitória/derrota
- **useImages**: Pré-carrega imagens do puzzle de forma assíncrona
- **useSound**: Controla reprodução de áudio e estado de mute
- **useTimer**: Cronômetro com start/stop/reset
- **useWinCounter**: Persiste estatísticas e streak no localStorage

### Animações

- Transições suaves de troca de peças (1000ms)
- Borda verde pulsante para peças na posição correta
- Confetes animados na vitória
- Feedback visual durante drag & drop

### Persistência

Dados salvos no localStorage:
- Estatísticas por dificuldade (vitórias e melhor tempo)
- Preferência de mute
- Streak atual

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

Desenvolvido para a comunidade OtPokemon

## 🙏 Agradecimentos

- Comunidade OtPokemon
- Comunidade Next.js e React
- Todos os jogadores e contribuidores

---

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!
