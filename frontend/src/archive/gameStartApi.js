import { cleanSubmission } from '@/utils';

export function gameStartReply(originContent) {
    let cleanContent = cleanSubmission(originContent);
    if (originContent === '↑↑↓↓←→←→BA') {
        cleanContent = originContent;
    }

    switch (cleanContent) {
        case 'PKU3':
            return {
                status: 'error',
                title: '答案错误！',
                message:
                    '你提交的答案为：' +
                    cleanContent +
                    '\n' +
                    '你会发现，这似乎与你实际提交的形式不同（如果你是根据指引提交的话），' +
                    '在进行答案比较的时候，我们会忽略英文大小写以及除了中文、英文和数字之外的其他符号，' +
                    '因此你不用担心因为格式细节导致答案错误。\n' +
                    '这是一个答案错误的示例，接下来，请输入『梦境永居宣言』 。',
            };

        case '梦境永居宣言':
            return {
                status: 'info',
                title: '里程碑！',
                message:
                    '你提交的答案为：' +
                    cleanContent +
                    '\n' +
                    '\n虽然这仍然不是最终答案，但是恭喜你触发了一个里程碑，' +
                    '“里程碑”是指在作答过程中遇到的有意义的语句。它们并非正确答案，而是一句对于下一步的指示。\n' +
                    '现在，请输入『陷入睡眠』来正式开始游戏。' +
                    '注意，提交之后队伍将不能解散、不能离队、不能更改队名，但是如果你的队伍人数还没有达到 6 人，你仍然可以招募新队员。',
            };

        case '陷入睡眠':
            return {
                status: 'success',
                title: '答案正确！',
                message: '这是归档模式，所以无事发生。',
            };

        case 'DECADE':
            return {
                status: 'info',
                title: '发现彩蛋！',
                message: '观察力不错！但是这里不是题。',
            };

        case '↑↑↓↓←→←→BA':
            return {
                status: 'info',
                title: '发现彩蛋！',
                message: '你是怎么想到提交这个的？',
            };

        case 'ATTENTIONISALLYOUNEED':
            return {
                status: 'info',
                title: '发现彩蛋！',
                message: 'Attention is All I Need!',
            };

        case 'REALITYIS':
            return {
                status: 'info',
                title: '璋',
                message: 'Reality is fragile.',
            };

        case 'ENDOFTIME':
            return {
                status: 'error',
                title: '非封闭类时曲线',
                message: '时间的尽头，不是现在。',
            };

        case '我看是琵琶拨尽四弦悲':
        case '琵琶拨尽四弦悲':
            if (Math.random() > 0.95) {
                return {
                    status: 'success',
                    title: '中奖了！',
                    message: '在正式比赛中，会给出一段口令，通过站内信发给工作人员可以获得 100 注意力！',
                };
            } else {
                return {
                    status: 'info',
                    title: '很遗憾……',
                    message: '你似乎触碰到了什么，但没有探知到有效情报。',
                };
            }

        case '一道好题':
        case '新难美趣':
            return {
                status: 'info',
                title: '去你的吧！',
                message: '你好像很喜欢四个字四个字地说话。',
            };

        case '哈哈开心':
            return {
                status: 'info',
                title: '喵喵喵？',
                message: '你知道吗？教堂的建造者是一个可爱的……',
            };

        case '狐狸怎么叫':
            return {
                status: 'info',
                title: '人在江湖',
                message: '你去参加答题节目的话，或许能够获胜吧。',
            };

        default:
            return {
                status: 'error',
                title: '答案错误！',
                message: '你提交的答案为：' + cleanContent + '\n' + '你没有得到任何信息。',
            };
    }
}