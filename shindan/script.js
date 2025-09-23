document.addEventListener('DOMContentLoaded', function() {

    // ========================================== 
    // 質問データ (q_&_c.txt より)
    // ========================================== 
    const axis_questions = [
        { "question": "理想の職場環境は？", "choices": [ { "text": "静かで、自分の作業に深く集中できるプライベートな空間が確保された環境。", "type": "ds" }, { "text": "オープンで、いつでも同僚と気軽にコミュニケーションが取れる活気のある環境。", "type": "hw" } ] },
        { "question": "あなたの能力がより発揮されると思う状況は？", "choices": [ { "text": "他者に対して何かしら働きかける時(他人の行動を促す、もしくは他人の手助けをするなど)", "type": "hw" }, { "text": "自分の頭の中で思考を巡らせている時(アイデアに没頭する、解決策を考えるなど)", "type": "df" } ] },
        { "question": "新しい情報をキャッチするときに好む方法は？", "choices": [ { "text": "人との会話や実際の体験から、リアルな情報を得る。", "type": "hw" }, { "text": "記事や本などを読み込み、整理された知識として吸収する。", "type": "ds" } ] },
        { "question": "ある作品（映画や本など）を「良い」と感じるポイントは？", "choices": [ { "text": "登場人物に強く感情移入でき、心を揺さぶられる感動や余韻。", "type": "hw" }, { "text": "ストーリーに矛盾が無く構成が巧みで、「なるほど」と唸らされる仕掛け。", "type": "df" } ] },
        { "question": "あなたがより惹かれるのは、どちらの響きですか？", "choices": [ { "text": "「未来」「新しいチャンス」", "type": "hw" }, { "text": "「今ここにあるもの」「揺るぎない安心感」", "type": "ds" } ] },
        { "question": "何かを決断をする時、あなたがより重視するのは？", "choices": [ { "text": "客観的なデータに基づいた、綿密な計画や論理的な分析。", "type": "df" }, { "text": "その時の直感や、自分の心の「しっくりくる感じ」。", "type": "hw" } ] }
    ];
    const four_choice_questions = [
        { "question": "問題解決に取り組む時の、あなたのスタイルは？", "choices": [ { "text": "関係者全員の気持ちを汲み取り、誰も傷つかないような調和的な着地点を探る。", "element": "水" }, { "text": "とにかく行動！トライ＆エラーを繰り返しながら、直感的に突破口を見つける。", "element": "火" }, { "text": "過去の経験や確実なデータに基づき、最もリスクの少ない方法を堅実に選ぶ。", "element": "地" }, { "text": "様々な視点から情報を集め、効率的な解決策を導き出す。", "element": "風" } ] },
        { "question": "チームで何かを成し遂げた時、あなたが自然と取っている役割は？", "choices": [ { "text": "分析やアイデア出し等、他者と意見交換をしながら戦略を立てている。", "element": "風" }, { "text": "メンバー間の人間関係を調整し、全体の調和を保っている。", "element": "水" }, { "text": "ムダがないよう計画的に実務を着実にこなし、屋台骨を支えている。", "element": "地" }, { "text": "チームの中心でメンバーを引っ張っていく存在になっている。", "element": "火" } ] },
        { "question": "もし、あなたの魂が奏でる「音」があるとしたら、それはどんな音ですか？", "choices": [ { "text": "全てを支える、重厚で安定したベースライン。", "element": "地" }, { "text": "自由に空間を駆け巡る、軽やかで技巧的なフルートのメロディ。", "element": "風" }, { "text": "全てを優しく包み込む、深く響き渡るチェロのハーモニー。", "element": "水" }, { "text": "人々の心を鼓舞する、力強いドラムのビート。", "element": "火" } ] },
        { "question": "あなたの人生という「旅」のスタイルに、最も当てはまるものはどれですか？", "choices": [ { "text": "好奇心旺盛な探検家。脇道にそれて、新しい発見を楽しむのが好きだ。", "element": "風" }, { "text": "確かな地図を持つ旅人。安全なルートで、確実に目的地を目指す。", "element": "地" }, { "text": "心の繋がりを求める巡礼者。旅の目的は、人との出会いや分かち合いにある。", "element": "水" }, { "text": "道なき道を行く冒険家。スリルと興奮の中にこそ、生きる実感がある。", "element": "火" } ] }
    ];
    const tie_breaker_question = {
        "question": "あなたの心に最も響く言葉は？", "choices": [
            { "text": "「人生は一度きりだ。自分の心の炎が燃える方へ、恐れず進め」", "element": "火" },
            { "text": "「焦ることはない。日々の誠実な積み重ねが、いつか君を支えるだろう」", "element": "地" },
            { "text": "「常に問い続けなさい。世界は、君がまだ知らない面白さで満ちている」", "element": "風" },
            { "text": "「君は一人じゃない。人を愛し、人に愛されること以上に尊いものはない」", "element": "水" }
        ]
    };

    // ========================================== 
    // 診断結果データ (aisyo_list.txt より統合)
    // ========================================== 
    const diagnosisResults = {
        "A型×火属性": { title: "内に秘めた情熱を燃やす<br>誠実なチャレンジャー", description: "普段はA型らしく、周囲への配慮を欠かさない温厚な常識人。しかしその内側には、まるで静かな炎のように「これだけは譲れない」という強い信念や理想を秘めています。A型の計画性と火の直感が組み合わさることで、情熱的でありながらも無謀ではない、頼れるリーダーになる資質を持っています。", strengths: "責任感が強く、最後までやり遂げる粘り強さ。いざという時の決断力と行動力。正義感が強く、仲間を引っ張っていく力。", challenges: "内面の情熱と、周囲の目を気にするA型気質との間で葛藤しやすい。時に頑固になり、自分のやり方に固執してしまうことも。", keywords: "誠実 / 情熱家 / 努力家<br>正義感 / リーダーシップ", compatibility: ["<strong>①O型-火属性</strong><br>同じ「火」の情熱を共有し、目標に向かう最高のパートナー。A型の計画性とO型の大胆なリーダーシップが噛み合い、O型がA型の内なる情熱を引き出し、A型がO型のビジョンを現実的に支えます。", "<strong>②O型-風属性</strong><br>A型火の内に秘めた情熱を、O型風が巧みなコミュニケーションで社会に繋げてくれます。A型が抱えがちな葛藤を、O型の大らかさと風通しの良い思考で軽くしてくれる、心強いサポーターです。"]}, 
        "A型×地属性": { title: "揺るぎない安定感を誇る<br>完璧主義な努力家", description: "「堅実」という言葉が最も似合うタイプで、安定と秩序を何よりも重んじます。A型の几帳面さと「地」の現実的な感覚が合わさり、何事も計画的に、そして着実にこなしていきます。派手さはありませんが、その確実な仕事ぶりと責任感の強さは、周囲から絶大な信頼を得ているはずです。自分の中に確固たる「美学」やルールがあり、それを静かに貫く強さを持っています。", strengths: "どんな時もブレない抜群の安定感と信頼性。<br>細部にまでこだわる完璧主義。<br>目標に向かってコツコツ努力できる<br>忍耐力。", challenges: "慎重すぎるあまり、チャンスを逃すことがある。自分にも他人にも完璧を求めすぎてしまい、少し厳しくなりがち。融通が利かない一面も。", keywords: "堅実 / 真面目 / 信頼<br>完璧主義 / 安定志向", compatibility: ["<strong>①O型-地属性</strong><br>同じ「地」の価値観を持つ、最も安定した組み合わせ。A型の完璧主義をO型の大らかさが受け止め、共に着実な成功を築き上げます。お互いを深く信頼し合える、揺るぎないパートナーシップです。", "<strong>②A型-水属性</strong><br>地のエレメントが現実を、水のエレメントが心を潤す補完関係。A型地の堅実さが、情緒が揺れやすいA型水の心の支えとなります。お互いの繊細さを理解し合える、優しさに満ちた関係です。"]}, 
        "A型×風属性": { title: "知性と気配りを兼ね備えた<br>スマートな社交家", description: "A型の持つ協調性に、「風」の持つ優れたコミュニケーション能力と知性が加わります。そのため、誰とでもそつなく付き合える高い社交性を持ち、場の空気を読んで立ち回るのが非常に得意です。しかし、そのにこやかな表情の裏では常に冷静に状況を分析しており、一人の時間で思考を整理することも大切にしているはずです。", strengths: "高いコミュニケーション能力と社交性。 論理的思考と細やかな気配りの両立。誰にでも公平に接するバランス感覚。", challenges: "周囲に気を使いすぎて八方美人に見えたり、自分の本音をなかなか出せないことがある。理屈っぽくなり、冷たい印象を与えることも。", keywords: "社交的 / 知的 / 気配り<br>バランス感覚 / 調整役", compatibility: ["<strong>①B型-風属性</strong><br>同じ「風」の知性を持ち、知的な刺激を与え合う、会話の尽きない関係。A型の気配りがB型の自由さを尊重し、B型のユニークな発想がA型の世界を広げます。お互いの知的好奇心を満し合える親友のようなペアです。", "<strong>②O型-火属性</strong><br>A型風の優れた分析力や調整能力を、O型火が最も評価し、頼りにしてくれます。O型火の情熱的なリーダーシップを、A型風が冷静な軍師として支える、理想的なビジネスパートナーにもなれる相性です。"]}, 
        "A型×水属性": { title: "深い愛情と共感力を持つ<br>繊細なサポーター", description: "A型の優しさと、「水」の豊かな感受性・共感力が合わさった、非常に心優しいタイプです。他人の痛みを自分のことのように感じ、困っている人を見ると放っておけません。身内や仲間に対する愛情は人一倍深く、献身的に尽くすことに喜びを感じます。その繊細さゆえに、傷つきやすく、ストレスを溜め込みやすい一面も持っています。", strengths: "抜群の共感力と献身的な愛情。大切なものを守るための、静かで深い愛情。そこにいるだけで人を安心させる。人を癒し、支える力。", challenges: "感情に流されやすく、気分の浮き沈みが激しい。他人の影響を受けやすく、精神的に疲れやすい。心配性。", keywords: "優しさ / 共感 / 献身<br>繊細 / 愛情深い", compatibility: ["<strong>①O型-水属性</strong><br>同じ「水」の深い愛情と共感力で結ばれる、魂のパートナー。A型の繊細な優しさをO型の大らかな愛情が包み込みます。多くを語らずとも、お互いの気持ちが手に取るようにわかる関係です。", "<strong>②A型-地属性</strong><br>情緒的なA型水を、現実的で安定感のあるA型地がしっかりと支える補完関係。A型水の優しさがA型地の心を癒し、A型地の堅実さがA型水に安心感を与えます。"]}, 
        "B型×火属性": { title: "好奇心の赴くまま突き進む<br>最強の自由人", description: "B型の「マイペース」さと「火」の「行動力」が相乗効果を生み、最もエネルギッシュで自由奔放なタイプとなります。好奇心に火がついたら、誰にも止められません。裏表のないストレートな感情表現と、自信に満ち溢れた姿は、周りを惹きつけるカリスマ性となります。考えるよりまず行動する、挑戦者です。", strengths: "圧倒的な行動力とチャレンジ精神。裏表がなく、正直で情熱的。ユニークな発想力と人を巻き込む力。", challenges: "衝動的で後先を考えないことがある。自己中心的になりやすく、周囲への配慮に欠けることも。熱しやすく冷めやすい。", keywords: "チャレンジャー<br>自由奔放 / 正直<br>情熱的 / 個性的", compatibility: ["<strong>①O型-火属性</strong><br>同じ「火」のエネルギッシュな魂で共鳴する、最強の同志。O型リーダーの元で、B型は最も自由に輝けます。互いの行動力を認め合い、一緒にいるだけでワクワクするような刺激的な関係です。", "<strong>②B型-風属性</strong><br>B型火の突進力を、B型風が面白いアイデアで更に加速させる最高の遊び仲間。B型同士なので気を使わず、風が火を煽るように、お互いの好奇心をどこまでも広げていくことができます。"]}, 
        "B型×地属性": { title: "好きな道を究める<br>こだわりの職人", description: "B型の持つ探求心やこだわりが、「地」の堅実性と結びつき、特定の分野を深く掘り下げる専門家タイプとなります。普段はマイペースで穏やかに見えますが、自分の好きなことや信じる道に対しては、驚くほどの集中力と忍耐力を発揮します。奔放に見えて根はしっかりしているため、信頼できる存在です。", strengths: "好きなことへの高い集中力と探求心。周囲に流されない意志の強さ。一度決めたことをやり抜く粘り強さ。", challenges: "自分の興味のないことには無頓着。頑固で、自分のスタイルをなかなか変えられない。「こだわり」が強すぎて、視野が狭くなることも。", keywords: "職人気質 / マイペース<br>こだわり / 探求心<br>粘り強さ", compatibility: ["<strong>①AB型-地属性</strong><br>同じ「地」のエレメントで、職人気質の者同士、深く尊敬し合える関係。お互いの専門分野やペースに干渉せず、静かに認め合います。多くを語らずとも、その確かな仕事ぶりで通じ合える仲です。", "<strong>②O型-水属性</strong><br>B型地のこだわりやマイペースさを、O型水が人間的な温かさで受け入れてくれます。B型地が集中できる環境をO型水が作り、O型水の感情的な部分をB型地の安定感が支える、心地よい関係です。"]}, 
        "B型×風属性": { title: "軽やかに時代を遊ぶ<br>ユニークなアイデアマン", description: "B型と「風」は、ともに「自由」で「個性的」という共通点を持つため、非常にユニークで掴みроどころのない魅力を持つタイプです。知的好奇心が旺盛で、新しい情報や面白いことを常に探しています。固定観念にとらわれない発想力と、それを軽やかに表現するコミュニケーション能力を併せ持ち、アートや企画分野で才能を発揮します。", strengths: "常識にとらわれないユニークな発想力。高い知的好奇心と情報収集能力。誰とでもフランクに話せる社交性。", challenges: "気ぐれで飽きっぽい。一つの場所に留まるのが苦手。人間関係が広く浅くなりがちで、時に深みに欠けることも。", keywords: "アイデアマン<br>好奇心旺盛 / 個性的<br>ユニーク / 自由人", compatibility: ["<strong>①A型-風属性</strong><br>同じ「風」の知性を共有し、会話が弾む最高の知己。B型の奔放なアイデアを、A型が面白がりながらも現実的な視点でサポート。お互いの自由を尊重し合える、軽やかでストレスのない関係です。", "<strong>②B型-火属性</strong><br>B型風のアイデアを、B型火がすぐさま行動に移してくれる、最強の実行部隊。退屈とは無縁で、次から次へと面白いことを一緒に仕掛けていける、最高の共犯者になれます。"]}, 
        "B型×水属性": { title: "独特の世界観を持つ<br>感性のアーティスト", description: "B型の個性的な感性と、「水」の豊かな感受性が融合し、独特の「不思議」なオーラを放つタイプです。夢やロマンを大切にし、直感やインスピレーションに従って生きています。感情表現は豊かですが、その世界観は独特なため、周りからはミステリアスに映ることも。意志が強く、意外な頑固さも持ち合わせています。", strengths: "豊かな感受性と独創的な世界観。直感力に優れる。愛情深く、一度心を許した相手にはとことん尽くす。", challenges: "気分屋で感情の波が激しい。現実離れした理想を追い求めがち。自分の世界に閉じこもることがある。", keywords: "アーティスト / 直感的<br>感受性 / ロマンチスト<br>不思議な魅力", compatibility: ["<strong>①：AB型-水属性</strong><br>お互いの独特な感性とミステリアスな世界観を、唯一無二のものとして理解し合える稀有な存在。言葉にしなくても、感性で通じ合えるソウルメイトのような関係です。", "<strong>②：O型-火属性</strong><br>B型水の独特な才能や世界観を、O型火が「面白い！」と評価し、陽の当たる場所へ引き上げてくれます。B型水の繊細さを、O型火の明るさがポジティブに照らしてくれる相性です。"]}, 
        "O型×火属性": { title: "人々を惹きつけてやまない<br>生まれながらのリーダー", description: "O型の持つ大らかなリーダーシップと、「火」のエレメントの持つ情熱・カリスマ性が合わさり、最もパワフルで存在感のあるタイプとなります。 常に前向きでエネルギッシュ。目標に向かって突き進む姿は、自然と周りに人を集めます。細かいことは気にしないカラッとした明るさと、面倒見の良さで多くの人に慕われるでしょう。", strengths: "圧倒的なリーダーシップとカリスマ性。ポジティブでエネルギッシュ。面倒見が良く、仲間思い。", challenges: "時に強引で自己中心的になりがち。大雑把で、細かい配慮に欠けることがある。負けず嫌いが過ぎることも。", keywords: "カリスマ / リーダー<br>情熱的 / 親分肌<br>エネルギッシュ", compatibility: ["<strong>①A型-火属性</strong><br>同じ「火」の情熱を持つ最強タッグ。O型の大胆なリーダーシップと、A型の誠実な実行力が完璧に噛み合います。A型はO型を心から信頼し、O型はA型の忠誠心を高く評価します。", "<strong>②B型-火属性</strong><br>互いのエネルギーを高め合う、ダイナミックな関係。O型が示す大きな方向性の中で、B型は自由に能力を発揮できます。一緒にいるだけでポジティブなパワーが満ち溢れる相性です。"]}, 
        "O型×地属性": { title: "信頼と実績を築き上げる<br>温厚な実力者", description: "O型の目標達成意欲が、地のエレメントの堅実さと結びつき、「有言実行」を体現する人。どっしりと落ち着いた雰囲気を持ち、包容力のある頼れる存在となります。理想を語るだけでなく、それを現実に落とし込むための地道な努力を惜しみません。組織のトップとして、部下を守り育てるような立場に向いています。", strengths: "包容力と安定感。現実的な視点で物事を判断できる落ち着き。目標を現実に変える実行力と忍耐力。人望が厚く、信頼される。", challenges: "保守的で、新しい変化を受け入れるのに時間がかかる。頑固で、一度決めたことはなかなか曲げない。", keywords: "包容力 / 安定感<br>実力者 / 信頼 / 現実的", compatibility: ["<strong>①A型-地属性</strong><br>「地」の価値観を共有する、最も信頼できるビジネスパートナー。O型の大局観とA型の緻密さが組み合わさり、着実な成功を収めます。お互いに安心して背中を預けられる関係です。", "<strong>②O型-水属性</strong><br>O型地の現実的な強さと、O型水の情緒的な温かさが補い合う理想的な夫婦のような関係。O型水が家庭的な安らぎを与え、O型地が社会的な安定を築きます。"]}, 
        "O型×風属性": { title: "ユーモアと広い人脈を持つ<br>華やかな社交家", description: "O型の社交性に、「風」の持つコミュニケーション能力と軽やかさが加わった、天性の人気者。人を楽しませることが好きで、ユーモアを交えた会話で場の空気を明るくするのが得意です。 幅広い人脈を持ち、様々な情報を集めては、それを周りのために活かすことができます。平和主義者で、人と人との調和を大切にします。", strengths: "抜群の社交性とコミュニケーション能力。ユーモアのセンスとサービス精神。広い人脈と情報網。", challenges: "時に調子が良すぎると見られることがある。深い話や深刻な雰囲気が苦手。広く浅い付き合いになりがち。", keywords: "社交家 / 人気者<br>情報通 / ユーモア<br>平和主義", compatibility: ["<strong>①A型-火属性</strong><br>A型火の情熱や理想を、O型風が持ち前の社交性で現実世界に広めてくれるプロデューサー的な関係。O型風にとって、A型火の純粋なエネルギーは非常に魅力的です。", "<strong>②AB型-風属性</strong><br>同じ「風」のエレメントで、知的な会話を楽しめるスマートな関係。AB型の鋭い分析を、O型は面白がりながら自分の戦略に活かします。ウェットになりすぎない、心地よい距離感を保てます。"]}, 
        "O型×水属性": { title: "仲間を全力で守り抜く<br>情に厚い人情家", description: "O型の仲間意識の強さと、「水」の共感力・愛情深さが結びついた、非常に情に厚いタイプです。身内や仲間と認めた相手には、どこまでも親身になり、全力で守ろうとします。感受性が豊かですが、O型のおおらかさが加わることで、ただ流されるだけでなく、芯の強さも持ち合わせています。少年少女のようなピュアな心を持つ人です。", strengths: "人情に厚く、面倒見が良い。仲間を大切にする強い絆。人間味あふれる温かさ。豊かな感受性と共感力。", challenges: "仲間びいきが強く、敵と味方をはっきり分けがち。感情的になりやすく、時に独占欲が強くなる。", keywords: "人情家 / 仲間思い<br>ピュア / 愛情深い<br>面倒見が良い", compatibility: ["<strong>①A型-水属性</strong><br>「水」の深い共感で結ばれる、最高の理解者。O型の大らかな愛情が、A型の繊細な心を守ります。お互いが「ありのままの自分」でいられる、安らぎに満ちた関係です。", "<strong>②B型-地属性</strong><br>O型水の愛情深さが、自分の世界に没頭しがちなB型地を温かく包み込みます。B型地の持つ確かな才能を、O型水は誰よりも信じ、応援してくれる最高のファンになります。"]}, 
        "AB型×火属性": { title: "冷静な頭脳と情熱を併せ持つ<br>クールな戦略家", description: "AB型の合理的な思考と、「火」の持つ野心・行動力が融合したタイプです。普段はクールで、感情を表に出すことは少ないですが、自分の目標や興味に対しては、内に秘めた情熱を燃やして、驚くほど大胆に行動します。そのギャップが大きな魅力となります。天才肌と社交性を生かし、物事をスマートにこなします。", strengths: "冷静な分析力と大胆な行動力の両立。目標達成への強い意欲。高い集中力と効率の良さ。", challenges: "二面性があり、何を考えているか分かりにくいと見られがち。時に自己主張が強すぎることがある。人との距離感が独特。", keywords: "戦略家 / 野心家<br>クール / 合理的<br>ギャップ", compatibility: ["<strong>①AB型-風属性</strong><br>AB型同士、お互いのテリトリーと知性を深く尊重し合える関係。特に「火」と「風」は相性が良く、AB型火の野心を、AB型風が冷静な戦略でサポートします。最高の頭脳チームです。", "<strong>②O型-風属性</strong><br>AB型火の持つ才能を、O型風が世の中にうまくプロデュースしてくれます。AB型が苦手な人間関係の調整をO型風が担い、AB型は自分の目標に集中できるという、WIN-WINの関係です。"]}, 
        "AB型×地属性": { title: "無駄を嫌う<br>孤高のプロフェッショナル", description: "AB型の持つ効率重視の姿勢と、「地」の堅実さ・現実感覚が合わさり、極めて冷静沈着で有能な実務家タイプとなります。感情に流されることなく、常に客観的かつ合理的に物事を判断し、無駄なく的確にタスクをこなします。自分の世界を大切にし、あまり多くを語らないため、ミステリアスな印象を与えます。", strengths: "高い分析能力と実務処理能力。常に冷静沈着で、感情に左右されない。自分の専門分野を極める力。", challenges: "ドライで人間味に欠ける印象を与えることがある。人との間に壁を作りやすく、打ち解けるのに時間がかかる。変化への対応が遅れがち。", keywords: "プロフェッショナル<br>ミステリアス / 合理的<br>実務家 / 冷静沈着", compatibility: ["<strong>①B型-地属性</strong><br>同じ「地」の職人気質を持つ者同士、多くを語らずとも互いの実力を認め合える尊敬の関係。互いに干渉せず、自分の仕事に集中できる、プロフェッショナルな距離感を保てます。", "<strong>②AB型-水属性</strong><br>AB型地の現実的な視点が、感性で動きがちなAB型水の良き相談相手となります。AB型水が持つ独特の洞察力は、AB型地にとって有益なヒントになることも。互いのミステリアスさを理解し合える仲です。"]}, 
        "AB型×風属性": { title: "時代を先読みする<br>知的な観察者", description: "AB型の分析力と、「風」の知性が最もシャープに現れる組み合わせです。頭の回転が非常に速く、物事の本質を瞬時に見抜くことができます。誰に対しても平等で博愛的な精神を持ちますが、心の内側には決して踏み込ませない、見えない壁を持っています。常識にとらわれない個性的な生き方をすることが多いでしょう。", strengths: "鋭い分析力と先見の明。極めて知的で論理的。公平で、偏見を持たない。", challenges: "理屈っぽく、皮肉屋に見られがち。他人に心を開かず、孤立することがある。行動よりも批評が先行することも。", keywords: "天才肌 / 知的 / 分析家<br>クール / 博愛主義", compatibility: ["<strong>①AB型-火属性</strong><br>「風」が「火」を煽るように、AB型風の知的な戦略がAB型火の野心に火をつけます。お互いの頭脳とクールさを尊敬し合える、最強のブレーン同士になれます。", "<strong>②O型-風属性</strong><br>同じ「風」で話が合い、O型の大らかさがAB型の気難しさをうまく中和してくれます。AB型が敬遠しがちなウェットな人間関係をO型が引き受け、AB型は快適なポジションにいられます。"]}, 
        "AB型×水属性": { title: "鋭い洞察力を持つ<br>不思議な癒し手", description: "AB型の持つクールな観察眼と、「水」の持つ共感力という、一見矛盾した性質が同居する、最もミステリアスなタイプです。人の心を鋭く見抜く洞察力を持ちながらも、それに深入りすることはなく、独特の距離感で相手に寄り添う不思議な優しさの持ち主です。繊細で優しいですが、その本心は誰にも見せません。", strengths: "人の心を見抜く鋭い洞察力。独特の感性と共感力。つかず離れずの絶妙な距離感で人を癒す力。", challenges: "本心が分からず、何を考えているか理解されにくい。感情のコントロールが複雑で、自分でも持て余すことがある。傷つきやすく、デリケート。", keywords: "不思議な魅力<br>ミステリアス<br>洞察力 / 癒し手 / 繊細", compatibility: ["<strong>①B型-水属性</strong><br>お互いの感性の鋭さと、独自の世界観を最も深く理解し合えるソウルメイト。常識では測れない価値観を共有できる、代わりのいない貴重な存在です。", "<strong>②A型-地属性</strong><br>AB型水の繊細で不安定になりがちな心を、A型地の堅実さと安定感がしっかりと支えてくれます。A型地は、AB型水の持つ不思議な洞察力や癒やしの力に魅力を感じます。"]} 
    };

    // --- 全ての背景画像パス --- 
    const allBackgroundImages = [ 'images/01_A-Fire/result.png', 'images/02_A-Earth/result.png', 'images/03_A-Air/result.png', 'images/04_A-Water/result.png', 'images/05_B-Fire/result.png', 'images/06_B-Earth/result.png', 'images/07_B-Air/result.png', 'images/08_B-Water/result.png', 'images/09_O-Fire/result.png', 'images/10_O-Earth/result.png', 'images/11_O-Air/result.png', 'images/12_O-Water/result.png', 'images/13_AB-Fire/result.png', 'images/14_AB-Earth/result.png', 'images/15_AB-Air/result.png', 'images/16_AB-Water/result.png' ];

    const typeToFolderMap = {
        "A型×火属性": "01_A-Fire", "A型×地属性": "02_A-Earth", "A型×風属性": "03_A-Air", "A型×水属性": "04_A-Water",
        "B型×火属性": "05_B-Fire", "B型×地属性": "06_B-Earth", "B型×風属性": "07_B-Air", "B型×水属性": "08_B-Water",
        "O型×火属性": "09_O-Fire", "O型×地属性": "10_O-Earth", "O型×風属性": "11_O-Air", "O型×水属性": "12_O-Water",
        "AB型×火属性": "13_AB-Fire", "AB型×地属性": "14_AB-Earth", "AB型×風属性": "15_AB-Air", "AB型×水属性": "16_AB-Water"
    };

    // ========================================== 
    // DOM要素
    // ========================================== 
    const startContainer = document.getElementById('start-container');
    const questionContainer = document.getElementById('question-container');
    const startButton = document.getElementById('start-button');
    const backButton = document.getElementById('back-button');
    const bloodtypeSelect = document.getElementById('bloodtype');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');
    const modal = document.getElementById('result-modal');
    const resultImage = document.getElementById('result-image');
    const closeModalButton = document.querySelector('.close-button');
    const snsShareContainer = document.getElementById('sns-share-container');
    const backgroundImagesContainer = document.querySelector('.background-images');
    const canvasPreviewContainer = document.getElementById('canvas-preview-container');

    // ========================================== 
    // 診断ロジック変数
    // ========================================== 
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let selectedBloodType = '';
    const allQuestions = [...axis_questions, ...four_choice_questions];
    const totalQuestions = allQuestions.length;
    let diagnosisCompleted = false;
    let lastResultData = null;
    let lastResultType = '';

    // ========================================== 
    // 初期化
    // ========================================== 
    history.replaceState({ page: 'start' }, 'Start', window.location.pathname);
    displayRandomBackgroundImages();

    // ========================================== 
    // イベントリスナー
    // ========================================== 
    startButton.addEventListener('click', startDiagnosis);
    backButton.addEventListener('click', () => history.back());
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) closeModal();
    });

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            if (event.state.page === 'start') {
                // 開始画面に戻る
                currentQuestionIndex = 0;
                userAnswers = [];
                startContainer.style.display = 'block';
                questionContainer.style.display = 'none';
                closeModal();
            } else if (event.state.page === 'end') {
                // 完了画面に（進むボタンなどで）移動した場合
                displayEndScreen();
            } else if (typeof event.state.question !== 'undefined') {
                // 特定の質問に戻る
                const targetIndex = event.state.question;
                // 回答履歴を調整
                if (userAnswers.length > targetIndex) {
                    userAnswers = userAnswers.slice(0, targetIndex);
                }
                currentQuestionIndex = targetIndex;
                diagnosisCompleted = false; // 診断中に戻るのでフラグをリセット
                displayQuestion(currentQuestionIndex);
            }
        } else {
            // 履歴に何もない場合（初期状態）
            currentQuestionIndex = 0;
            userAnswers = [];
            startContainer.style.display = 'block';
            questionContainer.style.display = 'none';
            closeModal();
        }
    });

    // ========================================== 
    // 関数
    // ========================================== 

    /**
     * 診断を開始する
     */
    function startDiagnosis() {
        selectedBloodType = bloodtypeSelect.value;
        // 状態をリセット
        diagnosisCompleted = false;
        lastResultData = null;
        lastResultType = '';
        userAnswers = [];
        currentQuestionIndex = 0;

        startContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        // 最初の質問の状態を履歴に追加
        history.pushState({ question: 0 }, '', '#question1');
        displayQuestion(0);
    }

    /**
     * 質問を表示する
     * @param {number} index - 表示する質問のインデックス
     */
    function displayQuestion(index) {
        // 戻るボタンの表示/非表示
        backButton.style.display = (index > 0) ? 'block' : 'none';

        // プログレスバーを更新
        progressBar.style.width = `${((index) / totalQuestions) * 100}%`;

        const question = allQuestions[index];
        questionText.textContent = `Q${index + 1}. ${question.question}`;
        choicesContainer.innerHTML = '';

        question.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-button';
            button.onclick = () => handleChoice(choice);
            choicesContainer.appendChild(button);
        });
    }
    
    /**
     * タイブレーク用の質問を表示する
     * @param {string[]} tieElements - 同点だったエレメントの配列
     */
    function displayTieBreaker(tieElements) {
        backButton.style.display = 'none'; // タイブレーク中は戻るボタンを非表示
        progressBar.style.width = '100%';
        questionText.textContent = tie_breaker_question.question;
        choicesContainer.innerHTML = '';

        tie_breaker_question.choices.forEach(choice => {
            if (tieElements.includes(choice.element)) {
                const button = document.createElement('button');
                button.textContent = choice.text;
                button.className = 'choice-button';
                button.onclick = () => finishDiagnosis(choice.element);
                choicesContainer.appendChild(button);
            }
        });
    }

    /**
     * 選択肢が選ばれた時の処理
     * @param {object} choice - ユーザーが選択した選択肢オブジェクト
     */
    function handleChoice(choice) {
        userAnswers.push(choice);
        currentQuestionIndex++;

        if (currentQuestionIndex < totalQuestions) {
            history.pushState({ question: currentQuestionIndex }, '', `#question${currentQuestionIndex + 1}`);
            displayQuestion(currentQuestionIndex);
        } else {
            calculateResult();
        }
    }

    /**
     * 結果を計算する
     */
    function calculateResult() {
        // パート1のスコア計算
        let hw_score = 0;
        let ds_score = 0;
        let df_score = 0;
        let hw_score_2 = 0;

        const part1Answers = userAnswers.slice(0, 6);
        part1Answers.forEach((answer, index) => {
            if (index % 2 === 0) { // 火風 vs 地水
                if (answer.type === 'hw') hw_score += 0.51;
                else if (answer.type === 'ds') ds_score += 0.51;
            } else { // 地風 vs 火水
                if (answer.type === 'df') df_score += 0.51;
                else if (answer.type === 'hw') hw_score_2 += 0.51;
            }
        });

        const base_scores = {
            "火": hw_score + hw_score_2,
            "風": hw_score + df_score,
            "地": ds_score + df_score,
            "水": ds_score + hw_score_2
        };

        // パート2のスコア計算
        const value_scores = { "火": 0, "地": 0, "風": 0, "水": 0 };
        const part2Answers = userAnswers.slice(6, 10);
        part2Answers.forEach(answer => {
            value_scores[answer.element] += 1;
        });

        // 最終スコア
        const final_scores = { "火": 0, "地": 0, "風": 0, "水": 0 };
        for (const element in final_scores) {
            final_scores[element] = base_scores[element] + value_scores[element];
        }

        // 勝者判定
        let maxScore = -1;
        for (const element in final_scores) {
            if (final_scores[element] > maxScore) {
                maxScore = final_scores[element];
            }
        }

        const winners = [];
        for (const element in final_scores) {
            if (final_scores[element] === maxScore) {
                winners.push(element);
            }
        }

        if (winners.length === 1) {
            finishDiagnosis(winners[0]);
        } else {
            displayTieBreaker(winners);
        }
    }

    /**
     * 診断を完了し、結果を保存・表示する
     * @param {string} finalElement - 最終的に決定したエレメント
     */
    function finishDiagnosis(finalElement) {
        diagnosisCompleted = true;
        const resultType = `${selectedBloodType}型×${finalElement}属性`;
        const resultData = diagnosisResults[resultType];

        // 結果を保存
        lastResultData = resultData;
        lastResultType = resultType;

        showModal(resultData, resultType);
    }

    /**
     * 診断完了画面を表示する
     */
    function displayEndScreen() {
        backButton.style.display = 'block';
        history.pushState({ page: 'end' }, '', '#end');

        progressBar.style.width = '100%';
        questionText.textContent = '診断は完了しました。';
        choicesContainer.innerHTML = '';

        // 「診断結果を見る」ボタン
        const viewResultButton = document.createElement('button');
        viewResultButton.textContent = '診断結果を見る';
        viewResultButton.className = 'choice-button';
        viewResultButton.style.textAlign = 'center';
        viewResultButton.onclick = () => {
            if (lastResultData && lastResultType) {
                showModal(lastResultData, lastResultType);
            }
        };
        choicesContainer.appendChild(viewResultButton);

        // 「もう一度診断する」ボタン
        const restartButton = document.createElement('button');
        restartButton.textContent = 'もう一度診断する';
        restartButton.className = 'choice-button';
        restartButton.style.textAlign = 'center';
        restartButton.onclick = () => {
            window.location.href = window.location.pathname;
        };
        choicesContainer.appendChild(restartButton);
    }

    /**
     * 結果モーダルを表示する
     * @param {object} result - 表示する結果データ
     * @param {string} type - 診断タイプ名 (例: A型×火属性)
     */
    function showModal(result, type) {
        if (!result) {
            alert("診断結果が見つかりませんでした。");
            return;
        }
        
        const resultTypeElement = document.getElementById('result-type');
        resultTypeElement.textContent = type;
        resultTypeElement.classList.remove('type-ab', 'type-other');
        if (type.startsWith('AB')) {
            resultTypeElement.classList.add('type-ab');
        } else {
            resultTypeElement.classList.add('type-other');
        }

        const folderName = typeToFolderMap[type];
        const imagePath = `images/${folderName}/result.png`;

        modal.style.display = 'none'; 
        resultImage.style.opacity = '0';

        resultImage.onload = function() {
            resultImage.style.opacity = '1';
            modal.style.display = 'block';
        };
        resultImage.src = imagePath;

        resultImage.onerror = function() {
            console.error("画像の読み込みに失敗しました: " + imagePath);
            modal.style.display = 'block';
            resultImage.style.opacity = '1';
        };

        document.getElementById('result-title').innerHTML = result.title;
        document.getElementById('result-keywords').innerHTML = `<span class="keyword-label">【キーワード】</span><br><span class="keyword-content">${result.keywords}</span>`;
        document.getElementById('result-description').innerHTML = result.description;
        document.getElementById('result-strengths').innerHTML = `<span class="label-text">【強み】</span><br>${result.strengths}`;
        document.getElementById('result-challenges').innerHTML = `<span class="label-text">【課題】</span><br>${result.challenges}`;
        document.getElementById('result-compatibility').innerHTML = `<span class="label-text">【相性がいい血液型エレメント】</span><br>${result.compatibility.join('<br><br>')}`;

        const shareIcons = document.querySelectorAll('.share-icon');
        shareIcons.forEach(icon => {
            icon.removeEventListener('click', shareResult); // 念のため既存のリスナーを削除
            icon.addEventListener('click', shareResult);
        });

        // シェアUIを「生成中」状態に
        const shareTextElement = snsShareContainer.querySelector('p');
        shareTextElement.textContent = 'シェア画像生成中...';
        snsShareContainer.style.pointerEvents = 'none';
        snsShareContainer.style.opacity = 0.5;

        // シェア画像を生成
        generateShareImage(result, type, imagePath);
    }

    /**
     * モーダルを閉じる
     */
    function closeModal() {
        modal.style.display = 'none';
        if (canvasPreviewContainer) {
            canvasPreviewContainer.style.display = 'none';
        }
        if (diagnosisCompleted) {
            displayEndScreen();
        }
    }

    /**
     * 背景にランダムな画像を表示する
     */
    function displayRandomBackgroundImages() {
        backgroundImagesContainer.innerHTML = '';
        const fixedImagePlacements = [
            { top: '-5%', left: '10%', scale: 0.7 }, { top: '-9%', right: '19%', scale: 0.5 },
            { top: '25%', right: '3%', scale: 0.8 }, { bottom: '0%', left: '16%', scale: 1.0 },
            { bottom: '-13%', right: '9%', scale: 0.7 }, { top: '50%', left: '-2%', transform: 'translateY(-50%)', scale: 0.6 },
            { top: '0%', left: '30%', scale: 0.7 }, { bottom: '15%', right: '25%', scale: 0.9 }
        ];
        const shuffledImages = [...allBackgroundImages].sort(() => 0.5 - Math.random());
        
        fixedImagePlacements.forEach((placement, i) => {
            const imageUrl = shuffledImages[i];
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.top = placement.top || 'auto';
            img.style.left = placement.left || 'auto';
            img.style.right = placement.right || 'auto';
            img.style.bottom = placement.bottom || 'auto';
            
            let transformStyle = `scale(${placement.scale})`;
            if (placement.transform) {
                transformStyle = `${transformStyle} ${transformStyle}`;
            }
            img.style.transform = transformStyle;
            img.style.opacity = `${0.05 + Math.random() * 0.1}`;
            backgroundImagesContainer.appendChild(img);
        });
    }

    /**
     * 結果をシェアする
     */
    async function shareResult(event) {
        if (!lastResultType || !lastResultData) {
            alert('先に診断を完了してください。');
            return;
        }

        const shareUrl = window.location.origin + window.location.pathname;
        const shareText = `私の診断結果は「${lastResultType}」でした！\nあなたの血液型エレメントは？\n\n${shareUrl}`;
        const hashtag = "#血液型エレメント診断 #血液型エレメント";
        
        const shareTextElement = snsShareContainer.querySelector('p');

        // UIを準備中状態に
        shareTextElement.textContent = '共有準備中...';
        snsShareContainer.style.pointerEvents = 'none';
        snsShareContainer.style.opacity = 0.5;

        // 1. Web Share APIのサポート状況を最初に確認
        if (!navigator.share) {
            // API自体がない場合は、PC向けフォールバックを実行して終了
            alert(`お使いのブラウザは画像シェアに対応していません。\n\n※スマートフォン版ブラウザでは、結果画像を共有できます。`);
            const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n\n${hashtag}`)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterIntentUrl, '_blank');
            // UIを元に戻す
            shareTextElement.innerHTML = '<b>SNSで結果をシェアする</b>';
            snsShareContainer.style.pointerEvents = 'auto';
            snsShareContainer.style.opacity = 1;
            return;
        }

        // 2. APIがある場合は、画像生成と共有を試みる
        try {
            const canvas = canvasPreviewContainer.querySelector('canvas');
            if (!canvas) throw new Error('Canvas要素が見つかりません。');

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('CanvasからBlobへの変換に失敗しました。');

            const file = new File([blob], 'diagnosis-result.png', { type: 'image/png' });
            const shareData = {
                title: '血液型エレメント診断',
                text: `${shareText}\n\n${hashtag}`,
                url: shareUrl,
                files: [file]
            };

            // 3. ファイル共有が可能かチェック
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                // 画像つきで共有
                await navigator.share(shareData);
                console.log('画像とテキストが正常に共有されました。');
            } else {
                // ファイル共有ができない場合はテキストのみで共有
                console.log('ファイル共有非対応のため、テキストとURLのみ共有します。');
                await navigator.share({ title: shareData.title, text: shareData.text, url: shareData.url });
            }
        } catch (error) {
            // ユーザーによるキャンセル (AbortError) や、その他の予期せぬエラーはここでキャッチ
            // キャンセルの場合は何もせず、エラーの場合はコンソールにログ出力
            if (error.name !== 'AbortError') {
                console.error('シェア中にエラーが発生しました:', error);
            } else {
                console.log('共有はユーザーによってキャンセルされました。');
            }
        } finally {
            // 4. 成功、失敗、キャンセルに関わらず、必ずUIを元に戻す
            shareTextElement.innerHTML = '<b>SNSで結果をシェアする</b>';
            snsShareContainer.style.pointerEvents = 'auto';
            snsShareContainer.style.opacity = 1;
        }
    }

    /**
     * シェア用の画像をCanvasで生成する (縦長レイアウト)
     */
    function generateShareImage(resultData, resultType, imagePath) {
        const canvasPreviewContainer = document.getElementById('canvas-preview-container');
        canvasPreviewContainer.style.display = 'none';

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 4:5の比率
        canvas.width = 1080;
        canvas.height = 1350;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imagePath;
        img.onload = () => {
            ctx.fillStyle = '#f8f0f8';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const padding = 80;
            const centerX = canvas.width / 2;
            let currentY = 90;

            // 1. 結果タイプ (サイズを縮小し、イラストとの間隔を0に)
            ctx.font = 'bold 52px sans-serif'; // サイズを55pxから48pxに縮小
            ctx.textAlign = 'center';
            ctx.strokeStyle = '#606060';
            ctx.lineWidth = 6;
            ctx.lineJoin = 'round';
            ctx.strokeText(resultType, centerX, currentY);
            ctx.fillStyle = 'white';
            ctx.fillText(resultType, centerX, currentY);
            currentY += 48; // フォントサイズ分だけ下に移動（イラストとの間隔を0に）

            // 2. イラスト
            const imgBoxWidth = canvas.width - padding * 2;
            const imgBoxHeight = 620; // イラストの高さを確保
            let drawWidth = img.width, drawHeight = img.height;
            const aspectRatio = drawWidth / drawHeight;
            if (drawHeight > imgBoxHeight) {
                drawHeight = imgBoxHeight;
                drawWidth = drawHeight * aspectRatio;
            }
            if (drawWidth > imgBoxWidth) {
                drawWidth = imgBoxWidth;
                drawHeight = drawWidth / aspectRatio;
            }
            const imgX = centerX - drawWidth / 2;
            const imgY = currentY;
            ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
            currentY += drawHeight + 60;

            // 3. 見出し
            ctx.font = 'bold 50px sans-serif';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 10; // 縁取りをさらに太く (8→10)
            ctx.fillStyle = '#b107ba';
            const titleLines = resultData.title.split('<br>');
            titleLines.forEach((line, index) => {
                if(index > 0) currentY += 65;
                ctx.strokeText(line, centerX, currentY);
                ctx.fillText(line, centerX, currentY);
            });
            currentY += 75;

            // 4. キーワード
            ctx.font = 'bold 34px sans-serif';
            ctx.fillStyle = '#ff69b4';
            ctx.fillText("【キーワード】", centerX, currentY);
            currentY += 50;
            ctx.font = '38px sans-serif';

            if (resultType === "AB型×地属性") {
                const keywordLines = "プロフェッショナル / ミステリアス<br>合理的 / 実務家 / 冷静沈着".split('<br>');
                keywordLines.forEach((line, index) => {
                    ctx.fillText(line.trim(), centerX, currentY);
                    if (index < keywordLines.length - 1) {
                        currentY += 45;
                    }
                });
            } else if (resultType === "B型×水属性") {
                const keywordLines = "アーティスト / 直感的 / 感受性<br>ロマンチスト / 不思議な魅力".split('<br>');
                keywordLines.forEach((line, index) => {
                    ctx.fillText(line.trim(), centerX, currentY);
                    if (index < keywordLines.length - 1) {
                        currentY += 45;
                    }
                });
            } else {
                const keywords = resultData.keywords.replace(/<br>/g, ' / ');
                ctx.fillText(keywords, centerX, currentY);
            }
            currentY += 75; // ブロック後の余白

            // 5. 相性情報
            ctx.font = 'bold 34px sans-serif';
            ctx.fillStyle = '#555';
            ctx.fillText("【相性がいい血液型エレメント】", centerX, currentY);
            currentY += 50;
            ctx.font = '38px sans-serif';
            const compatText1 = resultData.compatibility[0].split('<br>')[0].replace(/<[^>]*>/g, '');
            ctx.fillText(compatText1, centerX, currentY);
            currentY += 45;
            const compatText2 = resultData.compatibility[1].split('<br>')[0].replace(/<[^>]*>/g, '');
            ctx.fillText(compatText2, centerX, currentY);

            // 6. 説明文の抜粋
            currentY += 80; // Add some space
            ctx.font = '32px sans-serif';
            ctx.fillStyle = '#444';
            ctx.textAlign = 'left'; // Change to left for wrapping logic
            const snippet = resultData.description.substring(0, 56) + '...';
            const textX = padding;
            const maxWidth = canvas.width - padding * 2;
            let line = '';
            const lines = [];

            for (let i = 0; i < snippet.length; i++) {
                const char = snippet[i];
                const testLine = line + char;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && i > 0) {
                    lines.push(line);
                    line = char;
                } else {
                    line = testLine;
                }
            }
            lines.push(line);

            lines.forEach(l => {
                ctx.fillText(l, textX, currentY);
                currentY += 40; // Line height
            });

            // シェアUIを有効化
            const shareTextElement = snsShareContainer.querySelector('p');
            shareTextElement.innerHTML = '<b>SNSで結果をシェアする</b>';
            snsShareContainer.style.pointerEvents = 'auto';
            snsShareContainer.style.opacity = 1;
        };

        canvasPreviewContainer.appendChild(canvas);
    }
});
