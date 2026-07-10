import { useMemo, useState, type CSSProperties } from 'react';

type Difficulty = '基礎' | '実践' | '応用';

type Lesson = {
  id: number;
  title: string;
  feature: string;
  difficulty: Difficulty;
  xp: number;
  emoji: string;
  story: string;
  goal: string;
  howToPlay: string[];
  mission: string;
  proTip: string;
  quiz: {
    question: string;
    options: string[];
    answer: number;
  };
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Tab補完のファーストステップ',
    feature: 'Tab補完',
    difficulty: '基礎',
    xp: 80,
    emoji: '⚡',
    story: 'AIの相棒が、次に書きたいコードを先回りして提案してくれる街に到着しました。',
    goal: '入力中に出る補完を読み、必要な候補だけTabで受け入れられるようになる。',
    howToPlay: [
      '関数名やコメントで「何を作るか」を少し書く',
      '薄く表示された補完内容を読み、意図に合えばTabを押す',
      '合わない場合はそのまま入力を続け、より具体的な文脈を与える',
    ],
    mission: '小さな関数を1つ書き始め、Tab補完で本体を完成させよう。',
    proTip: '複数行の補完、import追加、近くのコードに合わせたスタイル提案も出ることがあります。',
    quiz: {
      question: 'Tab補完をうまく使うコツは？',
      options: ['何も読まずに毎回Tabを押す', '意図と合うか確認してから受け入れる', '補完が出たら必ずEscを押す'],
      answer: 1,
    },
  },
  {
    id: 2,
    title: '選択して一瞬で直す',
    feature: 'インライン編集',
    difficulty: '基礎',
    xp: 90,
    emoji: '✏️',
    story: '壊れた関数の橋を、短い指示だけで修復するチャレンジです。',
    goal: '選択範囲に対してCmd/Ctrl+Kで具体的な変更を依頼できる。',
    howToPlay: [
      '変更したいコードだけを選択する',
      'Cmd/Ctrl+Kを押して「async対応にして」など短く指示する',
      '差分を確認し、必要なら追加で調整する',
    ],
    mission: '重複した条件分岐を選択し、「読みやすく整理して」と依頼しよう。',
    proTip: '1ファイル内の小さな変更はインライン編集、複数ファイルの作業はAgentに渡すと進めやすいです。',
    quiz: {
      question: 'インライン編集に向いている作業は？',
      options: ['選択した関数のリファクタ', 'クラウドで長時間ビルド', 'PR全体の自動作成'],
      answer: 0,
    },
  },
  {
    id: 3,
    title: 'Askモードで安全に偵察',
    feature: 'Askモード',
    difficulty: '基礎',
    xp: 95,
    emoji: '🔎',
    story: '未知のコードベースを歩く前に、地図を作るための偵察ミッションです。',
    goal: 'コードを変更せず、設計や処理の流れを質問できる。',
    howToPlay: [
      '気になるファイルやエラーを開く',
      '「この認証処理の流れを説明して」と質問する',
      '回答に出たファイル名や関数を追って理解を深める',
    ],
    mission: '既存プロジェクトで「データ保存はどこで行われる？」と質問してみよう。',
    proTip: '変更したくない調査、レビュー前の理解、オンボーディングに向いています。',
    quiz: {
      question: 'Askモードの特徴は？',
      options: ['読み取り中心で理解を助ける', '必ずファイルを編集する', 'GitHubに自動でpushする'],
      answer: 0,
    },
  },
  {
    id: 4,
    title: 'Agentに実装クエストを任せる',
    feature: 'Agentモード',
    difficulty: '基礎',
    xp: 110,
    emoji: '🤖',
    story: '複数ステップの実装を相棒に任せ、あなたは隊長として成果を確認します。',
    goal: '要件、制約、完了条件を伝えてAgentに実装を進めさせる。',
    howToPlay: [
      'やりたい変更を1文で伝える',
      '重要な制約や触ってよい範囲を追加する',
      'Agentが出した差分、テスト結果、未解決点を確認する',
    ],
    mission: '「ログインフォームに必須チェックを追加して。既存スタイルに合わせて」と依頼しよう。',
    proTip: '検索、編集、端末実行まで行うため、最終差分のレビューは必ず行いましょう。',
    quiz: {
      question: 'Agentへの依頼で重要なものは？',
      options: ['曖昧な一言だけ送る', '要件と完了条件を伝える', '結果を確認しない'],
      answer: 1,
    },
  },
  {
    id: 5,
    title: 'Planモードで攻略ルート作成',
    feature: 'Planモード',
    difficulty: '基礎',
    xp: 105,
    emoji: '🗺️',
    story: '大きなダンジョンに入る前に、実装ルートとリスクを整理します。',
    goal: '実装前に設計、影響範囲、検証方法を言語化できる。',
    howToPlay: [
      '変更したい機能の目的を説明する',
      '「実装前に調査して計画して」と頼む',
      'ファイル構成、データの流れ、テスト観点を確認する',
    ],
    mission: '新しい設定画面を作る前に、必要なコンポーネントと状態管理をPlanで整理しよう。',
    proTip: '曖昧な要件、大きな改修、設計判断がある作業で特に効果的です。',
    quiz: {
      question: 'Planモードを使いたい場面は？',
      options: ['単語1つの typo 修正', '影響範囲が広い新機能の設計', '完成済みコードの保存'],
      answer: 1,
    },
  },
  {
    id: 6,
    title: 'Debugモードでバグ退治',
    feature: 'Debugモード',
    difficulty: '実践',
    xp: 125,
    emoji: '🐞',
    story: 'ログの森に隠れたバグを、証拠を集めながら追い詰めます。',
    goal: '再現手順、ログ、失敗テストから原因を絞り込める。',
    howToPlay: [
      '何をしたら壊れるかを具体的に伝える',
      'エラー文、スクリーンショット、失敗コマンドを共有する',
      '仮説、検証、修正の順に進めてもらう',
    ],
    mission: '失敗しているテストを1つ指定し、原因の仮説と検証手順を出してもらおう。',
    proTip: '推測だけで修正しないこと。実行時の証拠を増やすほど精度が上がります。',
    quiz: {
      question: 'Debugモードで最初に渡すとよい情報は？',
      options: ['好きな色', '再現手順とエラー内容', '空のメッセージ'],
      answer: 1,
    },
  },
  {
    id: 7,
    title: 'DesignモードでUIを磨く',
    feature: 'Designモード',
    difficulty: '実践',
    xp: 120,
    emoji: '🎨',
    story: '画面を見ながら、余白、色、配置をゲームの装備のように磨きます。',
    goal: '表示中のUIを見ながら視覚的な修正を依頼できる。',
    howToPlay: [
      '対象の画面を開く',
      '改善したい要素を選び、見た目の要望を伝える',
      '変更後にレスポンシブ表示も確認する',
    ],
    mission: 'カードUIを選択して「スマホで読みやすく、ボタンを大きく」と指示しよう。',
    proTip: 'スクリーンショット、要素選択、音声指示と相性がよく、UIの微調整に強いです。',
    quiz: {
      question: 'Designモードが得意なことは？',
      options: ['画面を見ながらUIを調整する', 'データベースのバックアップ', 'Gitの履歴削除'],
      answer: 0,
    },
  },
  {
    id: 8,
    title: 'ブラウザ操作でプレイテスト',
    feature: 'ブラウザ操作',
    difficulty: '実践',
    xp: 125,
    emoji: '🌐',
    story: 'Agentが実際にアプリを開き、ユーザーのように操作して確認します。',
    goal: 'Webアプリの表示、入力、エラー、コンソールを確認させられる。',
    howToPlay: [
      'ローカルサーバーを起動する',
      'Agentに画面を開いて操作してもらう',
      'スクリーンショット、console、networkの結果を確認する',
    ],
    mission: 'フォームに空入力を送信し、エラーメッセージが出るか確認してもらおう。',
    proTip: '「実際にクリックして確認して」と頼むと、見た目だけでなく操作の問題も見つけやすいです。',
    quiz: {
      question: 'ブラウザ操作の用途は？',
      options: ['Web画面の操作確認', '秘密情報を公開する', '依存関係を削除する'],
      answer: 0,
    },
  },
  {
    id: 9,
    title: '端末実行で証拠を集める',
    feature: '端末実行',
    difficulty: '実践',
    xp: 115,
    emoji: '💻',
    story: 'ビルド、テスト、検索コマンドを実行し、クエスト達成の証拠を集めます。',
    goal: 'Agentに必要なコマンドを実行させ、出力をもとに次の判断ができる。',
    howToPlay: [
      '実行したいコマンドの目的を伝える',
      '失敗したらログの重要部分を読ませる',
      '修正後に同じコマンドを再実行して確認する',
    ],
    mission: '`npm test`や`npm run build`を実行し、失敗時は原因を説明してもらおう。',
    proTip: '危険なコマンドや破壊的操作は、内容を理解してから実行する習慣を持ちましょう。',
    quiz: {
      question: '端末実行の結果で見るべきものは？',
      options: ['終了コードとエラーログ', 'ファイル名の長さだけ', '何も見ない'],
      answer: 0,
    },
  },
  {
    id: 10,
    title: 'セマンティック検索の宝探し',
    feature: 'セマンティック検索',
    difficulty: '実践',
    xp: 130,
    emoji: '🧭',
    story: '名前を知らない処理も、意味を手がかりに探し出します。',
    goal: 'キーワードが分からないコードを自然言語で探せる。',
    howToPlay: [
      '「決済失敗時の処理はどこ？」のように概念で聞く',
      '候補ファイルを開いて実装を確認する',
      '具体名が分かったら通常検索も併用する',
    ],
    mission: '「ユーザー通知を送っている場所」を意味検索で探してみよう。',
    proTip: '関数名が分かる時はテキスト検索、概念調査はセマンティック検索が便利です。',
    quiz: {
      question: 'セマンティック検索が強い場面は？',
      options: ['正確な関数名が不明な概念調査', '画面の明るさ調整', 'パスワードの保存'],
      answer: 0,
    },
  },
  {
    id: 11,
    title: 'AIコードレビュー道場',
    feature: 'コードレビュー',
    difficulty: '実践',
    xp: 135,
    emoji: '🛡️',
    story: '差分に潜むバグや抜け漏れを、レビューの盾で防ぎます。',
    goal: '変更差分からリスク、テスト不足、回帰の可能性を見つけられる。',
    howToPlay: [
      'レビュー対象の差分を用意する',
      '「バグと回帰リスクを優先してレビューして」と頼む',
      '指摘の根拠となるファイルと行を確認する',
    ],
    mission: '小さな変更差分を作り、AIに重大度順でレビューしてもらおう。',
    proTip: 'BugbotはPRレビュー、Agent Reviewは手元の変更確認に使い分けると便利です。',
    quiz: {
      question: 'コードレビューで優先して見るべきものは？',
      options: ['見た目の好みだけ', 'バグ、回帰、テスト不足', '絵文字の数'],
      answer: 1,
    },
  },
  {
    id: 12,
    title: 'Rulesでチームの掟を作る',
    feature: 'Rules',
    difficulty: '実践',
    xp: 135,
    emoji: '📜',
    story: 'プロジェクト固有の作法を、Agentがいつでも参照できる掟にします。',
    goal: '.cursor/rulesにコーディング規約や作業方針を書ける。',
    howToPlay: [
      '繰り返し伝えている指示を洗い出す',
      '短く具体的なルールとして保存する',
      '対象ファイルや用途でスコープを分ける',
    ],
    mission: '「Reactコンポーネントはnamed exportにする」などのルールを書いてみよう。',
    proTip: '長すぎるルールより、具体的で検証しやすいルールの方が効きやすいです。',
    quiz: {
      question: 'Rulesに向いている内容は？',
      options: ['毎回守ってほしいプロジェクト規約', '一度だけの雑談', '秘密鍵そのもの'],
      answer: 0,
    },
  },
  {
    id: 13,
    title: 'AGENTS.mdで案内板を置く',
    feature: 'AGENTS.md',
    difficulty: '実践',
    xp: 120,
    emoji: '🪧',
    story: '新しいAgentが迷わないよう、リポジトリ内に案内板を置きます。',
    goal: 'ビルド方法、テスト方法、注意点を簡潔に共有できる。',
    howToPlay: [
      'リポジトリのルートにAGENTS.mdを作る',
      'セットアップ、テスト、禁止事項を書く',
      'サブディレクトリごとの指示が必要なら近い場所に置く',
    ],
    mission: 'プロジェクトの「テストはnpm run buildで確認」といった手順を書こう。',
    proTip: '.cursor/rulesより簡易な案内として使え、オンボーディングにも役立ちます。',
    quiz: {
      question: 'AGENTS.mdに書くとよいものは？',
      options: ['Agent向けの作業手順', '個人のパスワード', '関係ない日記'],
      answer: 0,
    },
  },
  {
    id: 14,
    title: 'Skillsで必殺技を登録',
    feature: 'Skills',
    difficulty: '応用',
    xp: 150,
    emoji: '🧪',
    story: '繰り返す作業をスキル化し、いつでも呼び出せる必殺技にします。',
    goal: 'よく使う手順やスクリプトをSkillとして再利用できる。',
    howToPlay: [
      '繰り返し作業の入力、手順、成果物を整理する',
      'Skillに説明と必要なファイルをまとめる',
      '必要な時に名前で呼び出して使う',
    ],
    mission: '「リリースノート生成」や「PR説明作成」をSkill化する案を作ろう。',
    proTip: '手順が安定している作業ほどSkill化の効果が高くなります。',
    quiz: {
      question: 'Skillsに向いている作業は？',
      options: ['何度も行う定型作業', '二度と使わない思いつき', 'OSの起動'],
      answer: 0,
    },
  },
  {
    id: 15,
    title: 'MCPで外部ツールと接続',
    feature: 'MCP連携',
    difficulty: '応用',
    xp: 155,
    emoji: '🔌',
    story: 'Cursorを外部サービスにつなぎ、情報の扉を開きます。',
    goal: 'MCPでドキュメント、チケット、DBなどをAgentから使えるようにする考え方を理解する。',
    howToPlay: [
      '接続したいサービスと目的を決める',
      '信頼できるMCP serverを設定する',
      'Agentに必要な情報の取得や操作を依頼する',
    ],
    mission: 'JiraやNotionの情報を参照して実装するワークフローを設計しよう。',
    proTip: '権限、APIキー、信頼できるサーバーかどうかの確認が重要です。',
    quiz: {
      question: 'MCP連携で特に注意することは？',
      options: ['権限と認証情報の扱い', '背景色だけ', 'タイピング速度'],
      answer: 0,
    },
  },
  {
    id: 16,
    title: 'Subagentsでパーティ編成',
    feature: 'Subagents',
    difficulty: '応用',
    xp: 160,
    emoji: '👥',
    story: '調査役、テスト役、レビュー役を分担させ、パーティで攻略します。',
    goal: '複数の専門Agentに調査や検証を並列で任せられる。',
    howToPlay: [
      '分担できる作業を切り出す',
      '各Subagentに明確な成果物を指定する',
      '戻ってきた結果を統合して判断する',
    ],
    mission: '「調査Agent」と「テスト観点Agent」に分けて新機能のリスクを洗い出そう。',
    proTip: '広い調査や比較検討では強力ですが、目的が曖昧だと結果も散らばります。',
    quiz: {
      question: 'Subagentsを使うメリットは？',
      options: ['調査や検証を分担できる', '必ずコードが短くなる', 'ネットワークが不要になる'],
      answer: 0,
    },
  },
  {
    id: 17,
    title: 'Worktreesで別ルート攻略',
    feature: 'Worktrees',
    difficulty: '応用',
    xp: 145,
    emoji: '🌲',
    story: '同じリポジトリで複数の作戦を安全に試すため、別の作業ツリーを作ります。',
    goal: '実験的な変更や並列作業をGit worktreeで分離する考え方を理解する。',
    howToPlay: [
      '試したい方針ごとに作業ツリーを分ける',
      '各ツリーで独立してビルドやテストを行う',
      '一番よい成果だけを採用する',
    ],
    mission: '同じUI改善を2案に分けて試すなら、どう分離するか説明しよう。',
    proTip: '大きな実験やbest-of-Nの比較に便利で、作業中の差分衝突を減らせます。',
    quiz: {
      question: 'Worktreesが役立つ場面は？',
      options: ['複数案を分離して試す', 'すべてのファイルを削除する', '画面を録画する'],
      answer: 0,
    },
  },
  {
    id: 18,
    title: 'Cloud Agentsで遠征',
    feature: 'Cloud Agents',
    difficulty: '応用',
    xp: 170,
    emoji: '☁️',
    story: 'クラウドVMにAgentを送り出し、長めの実装や検証を任せます。',
    goal: 'クラウド上で実装、テスト、PR作成まで進めるワークフローを理解する。',
    howToPlay: [
      '課題と完了条件を明確に書く',
      '必要な環境変数やセットアップを整える',
      'Agentの進捗、差分、PRを確認する',
    ],
    mission: '「CI失敗を直してPRを更新して」とCloud Agentに頼む文面を作ろう。',
    proTip: '環境設定、Secrets、リポジトリ権限が成果に大きく影響します。',
    quiz: {
      question: 'Cloud Agentsに向いている作業は？',
      options: ['クラウドで実装や検証を進める作業', '一文字だけの入力補完', '手元の画面輝度調整'],
      answer: 0,
    },
  },
  {
    id: 19,
    title: 'Automationsで定期クエスト',
    feature: 'Automations',
    difficulty: '応用',
    xp: 165,
    emoji: '⏱️',
    story: 'イベントや時間をトリガーに、Agentが自動でクエストを開始します。',
    goal: 'PR、Slack、Webhook、スケジュールなどをきっかけに自動実行する発想を学ぶ。',
    howToPlay: [
      '自動化したい繰り返し作業を選ぶ',
      'トリガーと入力情報を決める',
      '失敗時の通知やレビュー方法も決める',
    ],
    mission: '「毎朝コードベースの変更点を要約する」Automationを設計しよう。',
    proTip: '自動化は便利ですが、権限範囲と実行結果の確認ループをセットにしましょう。',
    quiz: {
      question: 'Automationsのトリガーになり得るものは？',
      options: ['スケジュールやWebhook', '椅子の高さ', 'キーボードの色'],
      answer: 0,
    },
  },
  {
    id: 20,
    title: 'Cursor CLIで最終奥義',
    feature: 'Cursor CLI',
    difficulty: '応用',
    xp: 180,
    emoji: '🏁',
    story: 'ターミナルからAgentを呼び出し、開発ワークフローを自動化します。',
    goal: 'CLIでAgentを起動し、スクリプトやCIに組み込むイメージを持てる。',
    howToPlay: [
      'ターミナルでCLIを起動する',
      '自然言語で実装や調査を依頼する',
      '必要に応じて非対話モードやCloudへの引き継ぎを使う',
    ],
    mission: '`agent "このモジュールの責務を説明して"`のような依頼文を考えよう。',
    proTip: 'エディタ外の作業、CI、定型スクリプトとの組み合わせで強みが出ます。',
    quiz: {
      question: 'Cursor CLIの強みは？',
      options: ['ターミナルからAgentを使える', 'ブラウザの履歴を消すだけ', '画像編集専用である'],
      answer: 0,
    },
  },
];

const difficultyOrder: Record<Difficulty, number> = {
  基礎: 1,
  実践: 2,
  応用: 3,
};

const storageKey = 'cursor-quest-progress';

function loadProgress() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
}

function saveProgress(ids: number[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(ids));
}

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>(loadProgress);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];
  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);
  const totalXp = lessons
    .filter((lesson) => completedSet.has(lesson.id))
    .reduce((sum, lesson) => sum + lesson.xp, 0);
  const completionPercent = Math.round((completedLessonIds.length / lessons.length) * 100);
  const rank =
    totalXp >= 2200 ? 'Cursor Grandmaster' : totalXp >= 1500 ? 'AI Pair Pro' : totalXp >= 700 ? 'Workflow Explorer' : 'Rookie Coder';

  const lessonsByDifficulty = lessons.reduce<Record<Difficulty, Lesson[]>>(
    (groups, lesson) => {
      groups[lesson.difficulty].push(lesson);
      return groups;
    },
    { 基礎: [], 実践: [], 応用: [] },
  );

  const handleSelectLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setSelectedAnswer(null);
    setQuizResult(null);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) {
      return;
    }

    const isCorrect = selectedAnswer === selectedLesson.quiz.answer;
    setQuizResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect && !completedSet.has(selectedLesson.id)) {
      const nextCompleted = [...completedLessonIds, selectedLesson.id].sort((a, b) => a - b);
      setCompletedLessonIds(nextCompleted);
      saveProgress(nextCompleted);
    }
  };

  const handleNext = () => {
    const nextLesson = lessons.find((lesson) => lesson.id > selectedLesson.id) ?? lessons[0];
    handleSelectLesson(nextLesson.id);
  };

  const handleReset = () => {
    setCompletedLessonIds([]);
    setSelectedAnswer(null);
    setQuizResult(null);
    saveProgress([]);
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Mobile Cursor Learning RPG</p>
          <h1>Cursor Quest</h1>
          <p className="hero__lead">
            Cursorの人気機能トップ20を、基礎から応用までステージ攻略で学ぶミニゲームです。
            クイズに正解してXPを集め、AIコーディングの冒険者ランクを上げましょう。
          </p>
          <div className="hero__actions">
            <a href="#lesson" className="primary-action">
              今すぐプレイ
            </a>
            <button className="ghost-action" type="button" onClick={handleReset}>
              進捗リセット
            </button>
          </div>
        </div>

        <aside className="status-card" aria-label="学習進捗">
          <div className="level-ring" style={{ '--progress': `${completionPercent}%` } as CSSProperties}>
            <span>{completionPercent}%</span>
          </div>
          <div>
            <p className="status-card__label">現在のランク</p>
            <h2>{rank}</h2>
            <p>{completedLessonIds.length}/20 stages cleared</p>
          </div>
          <div className="xp-bar" aria-label={`XP ${totalXp}`}>
            <span style={{ width: `${Math.min(100, (totalXp / 2600) * 100)}%` }} />
          </div>
          <strong>{totalXp.toLocaleString()} XP</strong>
        </aside>
      </section>

      <section className="overview" aria-label="ゲームの進め方">
        <article>
          <span>1</span>
          <h2>機能を選ぶ</h2>
          <p>基礎、実践、応用の3エリアから、今学びたいCursor機能を選択します。</p>
        </article>
        <article>
          <span>2</span>
          <h2>ミッションを実践</h2>
          <p>短い説明と手順を読んで、実際のCursorで試せるタスクに挑戦します。</p>
        </article>
        <article>
          <span>3</span>
          <h2>クイズでクリア</h2>
          <p>理解度クイズに正解するとステージクリア。XPとランクが上がります。</p>
        </article>
      </section>

      <div className="game-layout">
        <nav className="stage-map" aria-label="Cursor機能ステージ一覧">
          {Object.entries(lessonsByDifficulty)
            .sort(([a], [b]) => difficultyOrder[a as Difficulty] - difficultyOrder[b as Difficulty])
            .map(([difficulty, group]) => (
              <section key={difficulty} className="stage-map__group">
                <div className="stage-map__heading">
                  <h2>{difficulty}</h2>
                  <span>{group.length} stages</span>
                </div>
                <div className="stage-buttons">
                  {group.map((lesson) => {
                    const isActive = lesson.id === selectedLesson.id;
                    const isComplete = completedSet.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`stage-button ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
                        onClick={() => handleSelectLesson(lesson.id)}
                        aria-pressed={isActive}
                      >
                        <span className="stage-button__number">{lesson.id}</span>
                        <span className="stage-button__emoji">{lesson.emoji}</span>
                        <span>
                          <strong>{lesson.feature}</strong>
                          <small>{isComplete ? 'Cleared' : `${lesson.xp} XP`}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
        </nav>

        <section id="lesson" className="lesson-card" aria-live="polite">
          <div className="lesson-card__topline">
            <span className={`difficulty difficulty--${selectedLesson.difficulty}`}>{selectedLesson.difficulty}</span>
            <span>{selectedLesson.xp} XP</span>
          </div>

          <div className="lesson-card__header">
            <div className="lesson-emoji">{selectedLesson.emoji}</div>
            <div>
              <p>Stage {selectedLesson.id.toString().padStart(2, '0')}</p>
              <h2>{selectedLesson.title}</h2>
            </div>
          </div>

          <p className="story">{selectedLesson.story}</p>

          <div className="lesson-section">
            <h3>学習ゴール</h3>
            <p>{selectedLesson.goal}</p>
          </div>

          <div className="lesson-section">
            <h3>攻略手順</h3>
            <ol>
              {selectedLesson.howToPlay.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="mission-card">
            <span>Mission</span>
            <p>{selectedLesson.mission}</p>
          </div>

          <div className="tip-card">
            <span>Pro tip</span>
            <p>{selectedLesson.proTip}</p>
          </div>

          <div className="quiz-card">
            <h3>クリアクイズ</h3>
            <p>{selectedLesson.quiz.question}</p>
            <div className="quiz-options">
              {selectedLesson.quiz.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={selectedAnswer === index ? 'is-selected' : ''}
                  onClick={() => {
                    setSelectedAnswer(index);
                    setQuizResult(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="primary-action quiz-submit" type="button" onClick={handleQuizSubmit}>
              回答してステージ判定
            </button>
            {quizResult && (
              <p className={`quiz-result quiz-result--${quizResult}`}>
                {quizResult === 'correct'
                  ? '正解！ステージクリアです。次のCursor機能へ進みましょう。'
                  : '惜しい！ヒントと手順をもう一度見てから再挑戦しましょう。'}
              </p>
            )}
          </div>

          <div className="lesson-actions">
            <button className="ghost-action" type="button" onClick={handleNext}>
              次のステージへ
            </button>
            {completedSet.has(selectedLesson.id) && <span className="clear-badge">Cleared +{selectedLesson.xp} XP</span>}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
