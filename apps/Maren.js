import plugin from "../../../lib/plugins/plugin.js"
import fetch from 'node-fetch'
import schedule from 'node-schedule'
import YAML from 'yaml'
import Yaml from '../Yaml/Yaml.js'
import fs from 'fs'
import co from '../../../lib/common/common.js'
import cfg from '../../../lib/config/config.js'
import { Cfg } from '../components/index.js'
import common from '../../../lib/common/common.js'

const path = process.cwd() + '/plugins/Jinmaocuicuisha-plugin'
const yaml = YAML.parse(fs.readFileSync(path + '/Cfg/ckck.yaml', 'utf8'))
const tplb_path = path + '/resources/img/骂人图片/';

let cd = false
let source = {}
let MuteTime = 600; // 禁言时间秒(需bot管理员)
let ckxg = yaml.ckck;
let ck_path = `./plugins/Jinmaocuicuisha-plugin/Cfg/Ciku/${ckxg}.yaml`
let _path = './plugins/Jinmaocuicuisha-plugin/resources/img/骂人图片/'

if (!fs.existsSync(tplb_path)) { fs.mkdirSync(tplb_path) }

export class Maren extends plugin {
    constructor() {
        super({
            name: 'Maren',
            dsc: 'Maren',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?骂人使用说明$',
                    /** 执行方法 */
                    fnc: 'Marenhelp'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?骂人图片列表$',
                    /** 执行方法 */
                    fnc: 'mrtplb',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?上传骂人图片*$',
                    /** 执行方法 */
                    fnc: 'scmrtp',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?删除骂人图片(\\d)+$',
                    /** 执行方法 */
                    fnc: 'delmrtp',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?词库列表$',
                    /** 执行方法 */
                    fnc: 'cikuliebiao',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?(写入|删除)文字(.*)$',
                    /** 执行方法 */
                    fnc: 'ciku',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配（欢迎投稿） */
                    reg: '^#?(.*)闭嘴(.*)|(.*)滚(.*)|(.*)傻逼(.*)|(.*)傻(.*)|(.*)吊毛(.*)|(.*)拉坤(.*)|(.*)菜鸡(.*)|(.*)人机(.*)|(.*)日你(.*)|(.*)草(.*)|(.*)操(.*)|(.*)艹(.*)|(.*)bz(.*)|(.*)sb(.*)|(.*)gun(.*)|(.*)cnm(.*)|(.*)草泥马(.*)|(.*)操你妈(.*)|(.*)草你妈(.*)|(.*)你麻痹(.*)|(.*)你妈逼(.*)|(.*)日你妈(.*)|(.*)日尼玛(.*)|(.*)nm(.*)|(.*)rnm(.*)|(.*)nmb(.*)|(.*)NMB(.*)|(.*)RNM(.*)|(.*)NM(.*)|(.*)SB(.*)|(.*)GUN(.*)|(.*)CNM(.*)|(.*)尼玛(.*)$|(.*)你妈(.*)|(.*)你妹(.*)|(.*)尼妈(.*)|(.*)你玛(.*)|(.*)尼妹(.*)|(.*)傻子(.*)|(.*)智障(.*)|(.*)ZZ(.*)|(.*)zz(.*)|(.*)垃圾(.*)|(.*)lj(.*)|(.*)呆逼(.*)|(.*)二臂(.*)|(.*)死逼(.*)|(.*)穷逼(.*)|(.*)笨蛋(.*)|(.*)白痴(.*)|(.*)有病(.*)|(.*)油饼(.*)|(.*)智障(.*)|(.*)王八(.*)|(.*)三八(.*)|(.*)贱人(.*)|(.*)逼样(.*)|(.*)DBF(.*)|(.*)小人(.*)|(.*)坏蛋(.*)|(.*)王八蛋(.*)|(.*)狼心狗肺(.*)|(.*)狗仗人势(.*)|(.*)禽兽不如(.*)|(.*)狼狈为奸(.*)|(.*)衣冠禽兽(.*)|(.*)猪狗不如(.*)|(.*)忘恩负义(.*)|(.*)为虎作伥(.*)|(.*)恩将仇报(.*)|(.*)指鹿为马(.*)|(.*)贼眉鼠眼(.*)|(.*)粉墨登场(.*)|(.*)鼠目寸光(.*)|(.*)祸国殃民(.*)|(.*)卑鄙无耻(.*)|(.*)丧心病狂(.*)|(.*)丧尽天良(.*)|(.*)狼心狗肺(.*)|(.*)吃里扒外(.*)|(.*)心怀叵测(.*)|(.*)井底之蛙(.*)|(.*)厚颜无耻(.*)|(.*)小肚鸡肠(.*)|(.*)Death(.*)|(.*)Poor(.*)|(.*)stupid(.*)|(.*)idiot(.*)|(.*)Wang Ba(.*)|(.*)Slut(.*)|(.*)villain(.*)|(.*)Bad guys(.*)|(.*)Wolf Heart Dog Lung(.*)|(.*)Dog Fighting Momentum(.*)|(.*)Birds and beasts are inferior to(.*)|(.*)Clothed beasts(.*)|(.*)Pigs and dogs are inferior to(.*)|(.*)ungratefulness(.*)|(.*)tiger(.*)|(.*)revenge(.*)|(.*)くそ(.*)|(.*)ばか(.*)|(.*)ブス(.*)|(.*)ちくしょう (.*)|(.*)アホ (.*)|(.*)愚か者(.*)|(.*)輿(.*)|(.*)ヒューマンマシン(.*)|(.*)ブラッシュアップ(.*)|(.*)他愛ない(.*)|(.*)おろかもの(.*)|(.*)はくち(.*)|(.*)はくち(.*)|(.*)ちくしょう(.*)|(.*)ぼけ(.*)|(.*)きちがい(.*)|(.*)げひん(.*)|(.*)いやらしい(.*)|(.*)できそこない(.*)|(.*)でぶでぶ、ぶよぶよ(.*)|(.*)见にくい颜(.*)|(.*)へんたい(.*)|(.*)くず(.*)|(.*)LJ(.*)$',
                    /** 执行方法 */
                    fnc: 'Maren'
                }
            ]
        })
    }



    async Marenhelp(e) {

        await e.reply('使用说明:\n#词库列表\n#写入文字+(文字)|删除文字+(序号)\n骂人图片列表\n上传骂人图片+(图片)|删除骂人图片+(序号)\n触发指令艾特机器人然后用不文明文字骂机器人')
        return false;
    }

    //骂人图片列表
    async mrtplb(e) {

        if (cd) return e.reply('数据上传中,请等一会再查看吧', true)
        cd = true
        let msglist = []
        try {
            let File = fs.readdirSync(_path)
            if (File.length == 0) {
                e.reply('呜一张图都没有鸭~请先使用指令【上传骂人图片】来上传图片吧~')
                cd = false
                return true
            }
            msglist.push(`嘿嘿骂人图片共${File.length}张，可输入【删除骂人图片+(序号)】进行删除`)
            for (let i = 0; i < File.length; i++) {
                msglist.push([`${i + 1}.`, segment.image(`${_path}${File[i]}`)])
            }
            let msgRsg = await e.reply(await co.makeForwardMsg(e, msglist))
            if (!msgRsg) e.reply('貌似被风控了，请私聊再试试吧~', true)
        } catch (err) {
            logger.error(err)
        }
        cd = false
    }

    //删除骂人图片
    async delmrtp(e) {

        //获取序号
        let num = e.msg.match(/\d+/)
        if (!num) {
            return e.reply('请带上要删除的序号 请先使用指令【骂人图片列表】查看下图片对应的序号再来删除！')
        }
        try {
            let File = fs.readdirSync(_path)
            fs.unlinkSync(`${_path}${File[num - 1]}`)
            await e.reply('删除成功~')
        } catch (err) {
            e.reply('删除失败，请检查有没有这个序号！')
        }
    }

    //上传骂人图片
    async scmrtp(e) {
        //cv花生
        if (cd) return e.reply('数据上传中,请等一会再上传吧', true)
        if (e.isGroup) {
            source = (await e.group.getChatHistory(e.source?.seq, 1)).pop()
        } else {
            source = (await e.friend.getChatHistory((e.source?.time + 1), 1)).pop()
        }
        let imageMessages = []
        if (source) {
            for (let val of source.message) {
                if (val.type === 'image') {
                    imageMessages.push(val.url)
                } else if (val.type === 'xml') {
                    let resid = val.data.match(/m_resid="(.*?)"/)[1]
                    if (!resid) break
                    let message = await e.bot.getForwardMsg(resid)
                    for (const item of message) {
                        for (const i of item.message) {
                            if (i.type === 'image') {
                                imageMessages.push(i.url)
                            }
                        }
                    }
                }
            }
        } else {
            imageMessages = e.img
        }
        if (!imageMessages.length) return e.reply('消息中未找到图片，请将要发送的图片与消息一同发送或者引用要添加的图像片~')
        cd = true
        try {
            let savePath
            let File
            if (!fs.existsSync(_path)) fs.mkdirSync(_path)
            for (let i = 0; i < imageMessages.length; i++) {
                File = fs.readdirSync(_path)
                savePath = `${_path}${File.length + 1}.jpg`
                await co.downFile(imageMessages[i], savePath)
            }
            e.reply(`上传骂人图片${imageMessages.length}张成功，可输入【骂人图片列表】查看`)
        } catch (err) {
            logger.error(err)
            e.reply('上传骂人图片失败')
        }
        cd = false
        return true
    }


    async cikuliebiao(e) {

        let forwardMsg = ['可使用指令【删除文字+(序号)】删除掉对应的文字']
        let data = await Yaml.getread(ck_path)
        let msg = []
        logger.info(data.词库列表)
        if (data.词库列表 == null || data.词库列表.length == 0) { return e.reply('词库还没有文字可以用呢~请用指令【写入文字+(文字)】添加文字') }
        for (let v = 0; v < data.词库列表.length; v++) {
            msg.push(`${v + 1}.` + data.词库列表[v] + '\n')
        }
        forwardMsg.push(msg)
        return e.reply(await co.makeForwardMsg(e, forwardMsg, "词库列表"))
    }

    async ciku(e) {

        let data = await Yaml.getread(ck_path)
        if (data.词库列表 == null) { data.词库列表 = [] }
        if (e.msg.includes('写入文字')) {
            let 文字 = e.msg.replace(/#|写入文字/g, '')
            if (!文字) { return e.reply('嗯？要写入的文字内容呢？'); true; }
            data.词库列表.push(文字)
            await Yaml.getwrite(ck_path, data)
            return e.reply(`【${文字}】成功添加进词库可使用指令【词库列表】查看！`); true;
        }
        if (e.msg.includes('删除文字')) {
            let num = e.msg.match(/\d+/)
            if (!num) {
                return e.reply('请带上序号啊！要不先用指令【词库列表】查看下文字对应的序号啊'); true;
            }
            let 内容 = data.词库列表[num - 1]
            if (!内容) { return e.reply('删除失败了呢，请检查序号是否正确，或检查词库列表是不是空的！'); true; }
            await data.词库列表.splice(data.词库列表.indexOf(内容), 1)
            await Yaml.getwrite(ck_path, data)
            await e.reply(`成功把【${内容}】从词库列表中删除~`)
        }
        return false;
    }

    async Maren(e) {

        if (!e.atBot) { //不被艾特
            return false;
        }

        if (e.atBot) { //被艾特
            let k = Math.ceil(Math.random() * 100)
            let data = await Yaml.getread(ck_path)
            let 词库列表 = data.词库列表
            let text_number = Math.ceil(Math.random() * 词库列表['length']) - 1
            let photo_name = await fs.readdirSync(tplb_path)
            let photo_number = Math.ceil(Math.random() * photo_name['length']) - 1
            let 文字概率 = 50
            let 图片概率 = 35
            let 禁言概率 = 15
            let msg;
            if (k < 文字概率) {
                if (!词库列表['length']) { e.reply('词库还没有文字,请用指令【写入文字+(文字)】添加文字哦~'); return true; }
                msg = [segment.at(e.user_id), 词库列表[text_number]]; //艾特对方然后随机回复词库的文字
                e.reply(msg)
                return true;

            } else if (k < (文字概率 + 禁言概率)) {
                if (e.group.is_admin && e.group.is_owner) {
                    let i = 0;
                    e.group.muteMember(e.user_id, MuteTime * (i + 1));  //禁言
                    msg = [segment.at(e.user_id), `你怎么不骂了？你继续啊！`];
                    e.reply(msg)
                    return true;
                }
                if (!e.group.is_admin && !e.group.is_owner && !e.member.is_owner && !e.member.is_admin) {
                    return e.reply("有种给我管理啊！", true);
                }

            } else if (k < (文字概率 + 禁言概率 + 图片概率)) {
                let s = Math.ceil(Math.random() * 5)
                if (!photo_name['length']) { return logger.info('图片目录还没有图片呢,可以用指令【上传骂人图片】来上传图片哦~'); true; }
                if (s == 5) {
                    msg = [segment.at(e.user_id), 词库列表[text_number], segment.image(tplb_path + photo_name[photo_number])]; //艾特对方然后随机回复图片目录中一张图和词库中的文字
                    e.reply(msg)
                    return true;
                }
                msg = [segment.at(e.user_id), segment.image(tplb_path + photo_name[photo_number])]; //艾特对方然后随机回复图片目录中一张图
                e.reply(msg)
                return true;
            }
            return false;
        }
    }
}