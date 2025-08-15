document.addEventListener('DOMContentLoaded', function() {
    // --- 全ての背景画像パス ---
    const allBackgroundImages = [
        'images/01_A-Fire/result.png',
        'images/02_A-Earth/result.png',
        'images/03_A-Air/result.png',
        'images/04_A-Water/result.png',
        'images/05_B-Fire/result.png',
        'images/06_B-Earth/result.png',
        'images/07_B-Air/result.png',
        'images/08_B-Water/result.png',
        'images/09_O-Fire/result.png',
        'images/10_O-Earth/result.png',
        'images/11_O-Air/result.png',
        'images/12_O-Water/result.png',
        'images/13_AB-Fire/result.png',
        'images/14_AB-Earth/result.png',
        'images/15_AB-Air/result.png',
        'images/16_AB-Water/result.png'
    ];
    
    // --- 診断結果データ ---
    const diagnosisResults = {
        "A型×火属性": {
            title: "内に秘めた情熱を燃やす、誠実なチャレンジャー",
            description: "普段はA型らしく真面目で、周囲への配慮を欠かしません。しかし、心の中には「火」の情熱と向上心を秘めており、一度「これだ」と決めた目標や信じる正義のためには、驚くほどの行動力を発揮します。A型の計画性と火の直感が組み合わさることで、情熱的でありながらも無謀ではない、頼れるリーダーになる資質を持っています。",
            strengths: "責任感が強く、最後までやり遂げる粘り強さ。いざという時の決断力と行動力。正義感が強く、仲間を引っ張っていく力。",
            challenges: "内面の情熱と、周囲の目を気にするA型気質との間で葛藤しやすい。時に頑固になり、自分のやり方に固執してしまうことも。",
            keywords: "誠実、情熱家、努力家、正義感、リーダーシップ"
        },
        "A型×地属性": {
            title: "揺るぎない安定感を誇る、完璧主義な努力家",
            description: "「堅実」という言葉が最も似合うタイプです。A型の几帳面さと「地」の現実的な感覚が合わさり、何事も計画的に、そして着実にこなしていきます。安定と秩序を何よりも重んじ、任されたことは完璧にやり遂げるため、組織の中では絶大な信頼を得るでしょう。急な変化やリスクを嫌う、究極の安定志向タイプです。",
            strengths: "抜群の安定感と信頼性。細部にまでこだわる完璧主義。目標に向かってコツコツ努力できる忍耐力。",
            challenges: "慎重すぎるあまり、チャンスを逃すことがある。マニュアルやルールから外れるのが極端に苦手で、融通が利かない面も。",
            keywords: "堅実、真面目、完璧主義、安定志向、信頼"
        },
        "A型×風属性": {
            title: "知性と気配りを兼ね備えた、スマートな社交家",
            description: "A型の持つ協調性に、「風」の持つ優れたコミュニケーション能力と知性が加わります。そのため、誰とでもそつなく付き合える高い社交性を持ち、場の空気を読んで立ち回るのが非常に得意です。冷静な分析力と細やかな気配りを両立できるため、人と人をつなぐ調整役や、知的な会話で場を盛り上げる人気者になることが多いでしょう。",
            strengths: "高いコミュニケーション能力と社交性。 論理的思考と細やかな気配りの両立。誰にでも公平に接するバランス感覚。",
            challenges: "周囲に気を使いすぎて八方美人に見えたり、自分の本音をなかなか出せないことがある。理屈っぽくなり、冷たい印象を与えることも。",
            keywords: "社交的、知的、気配り、バランス感覚、調整役"
        },
        "A型×水属性": {
            title: "深い愛情と共感力を持つ、繊細なサポーター",
            description: "A型の優しさと、「水」の豊かな感受性・共感力が合わさった、非常に心優しいタイプです。他人の痛みを自分のことのように感じ、困っている人を見ると放っておけません。身内や仲間に対する愛情は人一倍深く、献身的に尽くすことに喜びを感じます。その繊細さゆえに、傷つきやすく、ストレスを溜め込みやすい一面も持っています。",
            strengths: "抜群の共感力と献身的な愛情。相手の気持ちを察する繊細さ。人を癒し、支える力。",
            challenges: "感情に流されやすく、気分の浮き沈みが激しい。他人の影響を受けやすく、精神的に疲れやすい。心配性。",
            keywords: "優しさ、共感、献身、繊細、愛情深い"
        },
        "B型×火属性": {
            title: "好奇心の赴くままに突き進む、最強の自由人",
            description: "B型の「マイペース」さと「火」の「行動力」が相乗効果を生み、最もエネルギッシュで自由奔放なタイプとなります。好奇心に火がついたら、誰にも止められません。裏表のないストレートな感情表現と、自信に満ち溢れた姿は、周りを惹きつけるカリスマ性となります。考えるよりまず行動する、挑戦者です。",
            strengths: "圧倒的な行動力とチャレンジ精神。裏表がなく、正直で情熱的。ユニークな発想力と人を巻き込む力。",
            challenges: "衝動的で後先を考えないことがある。自己中心的になりやすく、周囲への配慮に欠けることも。熱しやすく冷めやすい。",
            keywords: "自由奔放、チャレンジャー、情熱的、正直、個性的"
        },
        "B型×地属性": {
            title: "好きな道を究める、こだわりの職人",
            description: "B型の持つ探求心やこだわりが、「地」の堅実性と結びつき、特定の分野を深く掘り下げる専門家タイプとなります。普段はマイペースで穏やかに見えますが、自分の好きなことや信じる道に対しては、驚くほどの集中力と忍耐力を発揮します。奔放に見えて根はしっかりしているため、信頼できる存在です。",
            strengths: "好きなことへの高い集中力と探求心。周囲に流されない意志の強さ。一度決めたことをやり抜く粘り強さ。",
            challenges: "自分の興味のないことには無頓着。頑固で、自分のスタイルをなかなか変えられない。「こだわり」が強すぎて、視野が狭くなることも。",
            keywords: "職人気質、マイペース、こだわり、探求心、粘り強さ"
        },
        "B型×風属性": {
            title: "軽やかに時代を遊ぶ、ユニークなアイデアマン",
            description: "B型と「風」は、ともに「自由」で「個性的」という共通点を持つため、非常にユニークで掴みどころのない魅力を持つタイプです。知的好奇心が旺盛で、新しい情報や面白いことを常に探しています。固定観念にとらわれない発想力と、それを軽やかに表現するコミュニケーション能力を併せ持ち、アートや企画分野で才能を発揮します。",
            strengths: "常識にとらわれないユニークな発想力。高い知的好奇心と情報収集能力。誰とでもフランクに話せる社交性。",
            challenges: "気まぐれで飽きっぽい。一つの場所に留まるのが苦手。人間関係が広く浅くなりがちで、時に深みに欠けることも。",
            keywords: "ユニーク、アイデアマン、好奇心旺盛、自由人、個性的"
        },
        "B型×水属性": {
            title: "独特の世界観を持つ、感性のアーティスト",
            description: "B型の個性的な感性と、「水」の豊かな感受性が融合し、独特の「不思議ちゃん」なオーラを放つタイプです。夢やロマンを大切にし、直感やインスピレーションに従って生きています。感情表現は豊かですが、その世界観は独特なため、周りからはミステリアスに映ることも。意志が強く、意外な頑固さも持ち合わせています。",
            strengths: "豊かな感受性と独創的な世界観。直感力に優れる。愛情深く、一度心を許した相手にはとことん尽くす。",
            challenges: "気分屋で感情の波が激しい。現実離れした理想を追い求めがち。自分の世界に閉じこもることがある。",
            keywords: "アーティスト、不思議ちゃん、感受性、ロマンチスト、直感的"
        },
        "O型×火属性": {
            title: "人々を惹きつけてやまない、生まれながらのリーダー",
            description: "O型の持つ親分肌なリーダーシップと、「火」のエレメントの持つ情熱・カリスマ性が合わさり、最もパワフルで存在感のあるタイプとなります。 常に前向きでエネルギッシュ。目標に向かって突き進む姿は、自然と周りに人を集めます。細かいことは気にしないカラッとした明るさと、面倒見の良さで多くの人に慕われるでしょう。",
            strengths: "圧倒的なリーダーシップとカリスマ性。ポジティブでエネルギッシュ。面倒見が良く、仲間思い。",
            challenges: "時に強引で自己中心的になりがち。大雑把で、細かい配慮に欠けることがある。負けず嫌いが過ぎることも。",
            keywords: "カリスマ、リーダー、情熱的、親分肌、エネルギッシュ"
        },
        "O型×地属性": {
            title: "信頼と実績を築き上げる、温厚な実力者",
            description: "O型の大らかさと目標達成意欲に、「地」の持つ安定感と現実性が加わります。その結果、どっしりと落ち着いた雰囲気を持ち、包容力のある頼れる存在となります。理想を語るだけでなく、それを現実に落とし込むための地道な努力を惜しみません。組織のトップとして、部下を守り育てるような立場に向いています。",
            strengths: "包容力と安定感。目標を現実に変える実行力と忍耐力。人望が厚く、信頼される。",
            challenges: "保守的で、新しい変化を受け入れるのに時間がかかる。頑固で、一度決めたことはなかなか曲げない。",
            keywords: "包容力、安定感、実力者、信頼、現実的"
        },
        "O型×風属性": {
            title: "ユーモアと広い人脈を持つ、華やかな社交家",
            description: "O型の社交性に、「風」の持つコミュニケーション能力と軽やかさが加わり、誰からも愛される人気者タイプです。人を楽しませることが好きで、ユーモアのセンスにも長けています。 幅広い人脈を持ち、様々な情報を集めては、それを周りのために活かすことができます。平和主義者で、人と人との調和を大切にします。",
            strengths: "抜群の社交性とコミュニケーション能力。ユーモアのセンスとサービス精神。広い人脈と情報網。",
            challenges: "時に調子が良すぎると見られることがある。深い話や深刻な雰囲気が苦手。広く浅い付き合いになりがち。",
            keywords: "社交家、人気者、ユーモア、平和主義、情報通"
        },
        "O型×水属性": {
            title: "仲間を全力で守り抜く、情に厚い人情家",
            description: "O型の仲間意識の強さと、「水」の共感力・愛情深さが結びついた、非常に情に厚いタイプです。身内や仲間と認めた相手には、どこまでも親身になり、全力で守ろうとします。感受性が豊かですが、O型のおおらかさが加わることで、ただ流されるだけでなく、芯の強さも持ち合わせています。少年少女のようなピュアな心を持つ人です。",
            strengths: "人情に厚く、面倒見が良い。仲間を大切にする強い絆。豊かな感受性と共感力。",
            challenges: "仲間びいきが強く、敵と味方をはっきり分けがち。感情的になりやすく、時に独占欲が強くなる。",
            keywords: "人情家、仲間思い、愛情深い、面倒見が良い、ピュア"
        },
        "AB型×火属性": {
            title: "冷静な頭脳と情熱を併せ持つ、クールな戦略家",
            description: "AB型の合理的な思考と、「火」の持つ野心・行動力が融合したタイプです。普段はクールで、感情を表に出すことは少ないですが、自分の目標や興味に対しては、内に秘めた情熱を燃やして、驚くほど大胆に行動します。そのギャップが大きな魅力となります。天才肌と社交性を生かし、物事をスマートにこなします。",
            strengths: "冷静な分析力と大胆な行動力の両立。目標達成への強い意欲。高い集中力と効率の良さ。",
            challenges: "二面性があり、何を考えているか分かりにくいと見られがち。時に自己主張が強すぎることがある。人との距離感が独特。",
            keywords: "戦略家、クール、野心家、合理的、ギャップ"
        },
        "AB型×地属性": {
            title: "無駄を嫌う、ミステリアスなプロフェッショナル",
            description: "AB型の持つ効率重視の姿勢と、「地」の堅実さ・現実感覚が合わさり、極めて冷静沈着で有能な実務家タイプとなります。感情に流されることなく、常に客観的かつ合理的に物事を判断し、無駄なく的確にタスクをこなします。自分の世界を大切にし、あまり多くを語らないため、ミステリアスな印象を与えます。",
            strengths: "高い分析能力と実務処理能力。常に冷静沈着で、感情に左右されない。自分の専門分野を極める力。",
            challenges: "ドライで人間味に欠ける印象を与えることがある。人との間に壁を作りやすく、打ち解けるのに時間がかかる。変化への対応が遅れがち。",
            keywords: "プロフェッショナル、冷静沈着、合理的、実務家、ミステリアス"
        },
        "AB型×風属性": {
            title: "時代を先読みする、孤高の天才評論家",
            description: "AB型の分析力と、「風」の知性が最もシャープに現れる組み合わせです。頭の回転が非常に速く、物事の本質を瞬時に見抜くことができます。誰に対しても平等で博愛的な精神を持ちますが、感情的なウェットさを嫌い、人とは一定の距離を保ちます。常識にとらわれない個性的な生き方をすることが多いでしょう。",
            strengths: "鋭い分析力と先見の明。極めて知的で論理的。公平で、偏見を持たない。",
            challenges: "理屈っぽく、皮肉屋に見られがち。他人に心を開かず、孤立することがある。行動よりも批評が先行することも。",
            keywords: "天才肌、知的、分析家、クール、博愛主義"
        },
        "AB型×水属性": {
            title: "鋭い洞察力を持つ、不思議な癒し手",
            description: "AB型の持つクールな観察眼と、「水」の持つ共感力という、一見矛盾した性質が同居する、最もミステリアスなタイプです。人の心を鋭く見抜く洞察力を持ちながらも、それに深入りすることはなく、独特の距離感で相手に寄り添います。繊細で優しいですが、その本心は誰にも見せません。",
            strengths: "人の心を見抜く鋭い洞察力。独特の感性と共感力。つかず離れずの絶妙な距離感で人を癒す力。",
            challenges: "本心が分からず、何を考えているか理解されにくい。感情のコントロールが複雑で、自分でも持て余すことがある。傷つきやすく、デリケート。",
            keywords: "洞察力、ミステリアス、癒し手、繊細、不思議な魅力"
        }
    };

    // --- DOM要素 ---
    const diagnoseButton = document.querySelector('button');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const bloodtypeSelect = document.getElementById('bloodtype');
    const modal = document.getElementById('result-modal');
    const closeModalButton = document.querySelector('.close-button');
    const backgroundImagesContainer = document.querySelector('.background-images'); // 新しく追加

    // --- 関数 ---
    function getZodiacSign(month, day) {
        const signs = [
            { sign: "山羊座", start: "01/01" }, { sign: "水瓶座", start: "01/20" },
            { sign: "魚座", start: "02/19" }, { sign: "牡羊座", start: "03/21" },
            { sign: "牡牛座", start: "04/20" }, { sign: "双子座", start: "05/21" },
            { sign: "蟹座", start: "06/22" }, { sign: "獅子座", start: "07/23" },
            { sign: "乙女座", start: "08/23" }, { sign: "天秤座", start: "09/23" },
            { sign: "蠍座", start: "10/24" }, { sign: "射手座", start: "11/23" },
            { sign: "山羊座", start: "12/22" }
        ];
        let userSign = "";
        for (let i = signs.length - 1; i >= 0; i--) {
            const signDate = new Date(`2000/${signs[i].start}`);
            const userDate = new Date(`2000/${month}/${day}`);
            if (userDate >= signDate) {
                userSign = signs[i].sign;
                break;
            }
        }
        return userSign;
    }

    function getElement(sign) {
        switch (sign) {
            case "牡羊座": case "獅子座": case "射手座": return "火属性";
            case "牡牛座": case "乙女座": case "山羊座": return "地属性";
            case "双子座": case "天秤座": case "水瓶座": return "風属性";
            case "蟹座": case "蠍座": case "魚座": return "水属性";
            default: return "不明";
        }
    }

    function showModal(result, type) {
        if (!result) {
            alert("診断結果が見つかりませんでした。別のタイプも試してみてください。");
            return;
        }
        document.getElementById('result-type').textContent = type;
        // --- 画像のsrcを設定するロジックを追加 ---
        const typeToFolderMap = {
            "A型×火属性": "01_A-Fire",
            "A型×地属性": "02_A-Earth",
            "A型×風属性": "03_A-Air",
            "A型×水属性": "04_A-Water",
            "B型×火属性": "05_B-Fire",
            "B型×地属性": "06_B-Earth",
            "B型×風属性": "07_B-Air",
            "B型×水属性": "08_B-Water",
            "O型×火属性": "09_O-Fire",
            "O型×地属性": "10_O-Earth",
            "O型×風属性": "11_O-Air",
            "O型×水属性": "12_O-Water",
            "AB型×火属性": "13_AB-Fire",
            "AB型×地属性": "14_AB-Earth",
            "AB型×風属性": "15_AB-Air",
            "AB型×水属性": "16_AB-Water"
        };
        const resultImage = document.getElementById('result-image');
        const folderName = typeToFolderMap[type] || type; // マップにない場合は元のtypeを使用
        const imagePath = `images/${folderName}/result.png`;
        resultImage.src = imagePath;
        // --- ここまで ---
        document.getElementById('result-title').textContent = result.title;
        document.getElementById('result-description').textContent = result.description;
                document.getElementById('result-strengths').innerHTML = `<span class="label-text">【強み】</span><br>${result.strengths}`;
                document.getElementById('result-challenges').innerHTML = `<span class="label-text">【課題】</span><br>${result.challenges}`;
        document.getElementById('result-keywords').innerHTML = `<span class="keyword-label">【キーワード】</span><br><span class="keyword-content">${result.keywords}</span>`;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function displayRandomBackgroundImages() {
        backgroundImagesContainer.innerHTML = ''; // Clear existing images

        // ユーザーが直接編集できる固定の画像配置とサイズ
        // 各オブジェクトは { imageUrl: '画像のパス', top: 'Y%', left: 'X%', scale: 0.X } の形式
        // または { imageUrl: '画像のパス', top: 'Y%', right: 'X%', scale: 0.X }
        // scaleは0.1 (10%) から 2.0 (200%) 程度で調整してください。
        const fixedImagePlacements = [
            { imageUrl: 'images/01_A-Fire/result.png', top: '-5%', left: '15%', scale: 1.0 },
            { imageUrl: 'images/01_A-Fire/result.png', top: '-9%', right: '19%', scale: 0.8 },
            { imageUrl: 'images/05_B-Fire/result.png', top: '25%', right: '3%', scale: 1.0 },
            { imageUrl: 'images/09_O-Fire/result.png', bottom: '0%', left: '16%', scale: 1.2 },
            { imageUrl: 'images/13_AB-Fire/result.png', bottom: '-10%', right: '16%', scale: 1.2 },
            { imageUrl: 'images/03_A-Air/result.png', top: '50%', left: '-2%', transform: 'translateY(-50%)', scale: 0.8 } // 垂直中央
        ];

        // ランダムに5枚の画像を選び、上記の位置に割り当てる
        const shuffledImages = [...allBackgroundImages].sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < fixedImagePlacements.length; i++) {
            const placement = fixedImagePlacements[i];
            const imageUrl = shuffledImages[i]; // ランダムに選ばれた画像を使用

            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.top = placement.top;
            img.style.left = placement.left || 'auto';
            img.style.right = placement.right || 'auto';
            img.style.bottom = placement.bottom || 'auto';
            
            let transformStyle = `scale(${placement.scale})`;
            if (placement.transform) {
                transformStyle = `${placement.transform} ${transformStyle}`;
            }
            img.style.transform = transformStyle;

            img.style.opacity = `${0.05 + Math.random() * 0.1}`; // 透明度はランダムのまま
            
            backgroundImagesContainer.appendChild(img);
        }
    }

    // --- イベントリスナー ---
    diagnoseButton.addEventListener('click', function() {
        const month = parseInt(monthSelect.value, 10);
        const day = parseInt(daySelect.value, 10);
        const bloodtypeValue = bloodtypeSelect.value;

        const date = new Date(2000, month - 1, day);
        if (date.getMonth() !== month - 1) {
            alert("有効な日付を選択してください。");
            return;
        }

        const zodiacSign = getZodiacSign(month, day);
        const element = getElement(zodiacSign);
        const resultType = `${bloodtypeValue}型×${element}`;
        
        const resultData = diagnosisResults[resultType];
        showModal(resultData, resultType);
    });

    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // 初期表示と定期的な更新
    displayRandomBackgroundImages();
    
});