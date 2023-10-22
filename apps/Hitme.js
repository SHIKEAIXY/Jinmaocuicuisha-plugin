import plugin from "../../../lib/plugins/plugin.js"
import common from '../../../lib/common/common.js'
import fetch from 'node-fetch'
import YAML from 'yaml'
import Yaml from '../Yaml/Yaml.js'
import fs from 'fs'
import moment from 'moment'
const _path = process.cwd();

let hit = ['一拳!','两拳!', '三拳!', '四拳!', '五拳!', '六拳!', '七拳!', '八拳!', '九拳!', '十拳!'];
let MuteTime = 60; // 禁言时间 单位秒(需bot管理员)
let banword = ["rbq","RBQ","肉便器","吃精","请中出我","精子"]
// 不可以设置bot名字的词
let HitMeCD = false;
// 默认关闭 false关 true开
let HitMe_time = 10;
// CD时长，单位分钟

let path='./plugins/Jinmaocuicuisha-plugin/Cfg/api.yaml'
let path1='./plugins/Jinmaocuicuisha-plugin/Cfg/qq.yaml'
let path2='./plugins/Jinmaocuicuisha-plugin/Cfg/Hitmaster.yaml'
let 主人 = './config/config/other.yaml';

if (!fs.existsSync(path)) {fs.writeFileSync(path,'')}
if (!fs.existsSync(path1)) {fs.writeFileSync(path1,'')}

export class HitmeandTa extends plugin {
    constructor() {
		super({
			name: '打我and打他',
			dsc: '打我打他',
			event: 'message',
			priority: 5000,
			rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?查看打人api$',
                    /** 执行方法 */
                    fnc: 'HitMeapi',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: "^#?(参考api|api参考)$",
                        /** 执行方法 */
                     fnc: "Hitmeckapi"
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?本群(禁用|启用)打人$',
                    /** 执行方法 */
                    fnc: 'ofHitMe',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?打他(仅我|所有人)可用$',
                    /** 执行方法 */
                    fnc: 'Hitmaster',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?(写入|删除)打人api(.*)$',
                    /** 执行方法 */
                    fnc: 'setHitMeapi',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?设置打人(Bot|bot|BOT)名字(.*)$',
                    /** 执行方法 */
                    fnc: 'setBotname',
                    permission: 'master'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?(打|hit|HIT|da|DA)(我|me|ME|wo|WO)$',
                    /** 执行方法 */
                    fnc: 'HitMe'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?(打|hit|HIT|da|DA)(他|ta|TA|he|HE).*$',
                    /** 执行方法 */
                    fnc: 'Hitta'
                }
            ]
        })
    }
async Hitmeckapi(e) {

        let text = "真寻https://mahiro.tianyi.one\n \n二次元壁纸https://t.mwm.moe/pc\n \n二次元风景https://t.mwm.moe/fj\n \n随机ai图https://t.mwm.moe/ai\n \n动漫http://www.dmoe.cc/random.php\n  \n动漫https://moe.anosu.top/img\n \n随机图https://api.yimian.xyz/img\n \n随机可爱图http://www.98qy.com/sjbz/api.php\n \n随机竖屏图https://api.anosu.top/img\n \n原神https://api.dujin.org/pic/yuanshen\n \n随机pc涩图ph.tianyi.one/pc.php\n \n随机mp涩图ph.tianyi.one/mp.php\n \n随机r18图ph.tianyi.one/rd.php\n \n随机萝莉r18图http://loli.tianyi.one\n \n使用方法 #写入打人api+上面的随便一个api即可 \n注意每次更换api时请先 #删除打人api 再写入api\n \n如果你使用了原神api那么返回速度会非常慢！";
        let msg = [
            text,
            segment.image(`https://mahiro.tianyi.one`)
        ];
        e.reply(msg);
        return true; 
    };

async Hitmaster(e) {

    let botname = await redis.get(`dw:botnickname:${e.bot_id}`)
    let data = await Yaml.getread(path2)
    if (data.Hitmaster && e.msg.includes('打他仅我可用')){
    data.Hitmaster = false;
    await e.reply(`主人大大${botname}知道了~`)
    }
    if (!data.Hitmaster && e.msg.includes('打他所有人可用')){
    data.Hitmaster = true;
    await e.reply(`嘿嘿${botname}终于可以大展身手啦~`)
    }
    Yaml.getwrite(path2,data)
    return false;
    }

async HitMeapi(e){
    let data = getread()
    let msg = '还没有api呢~'
    if(data){
      msg = 'api:\n'
      data.map(v => msg += `${v}\n`)
    }
    e.reply(await common.makeForwardMsg(e, [msg]))
    return false;
}

async setHitMeapi(e){

    let data=await getread()
        if (!data) data= [];
        if (data.length > 0&&e.msg.includes('写入打人api')){
        return e.reply("api只能添加一个哦请先#删除打人api 鸭~", true);
        } else if (e.msg.includes('写入打人api')){
        let api=e.msg.replace(/#|写入|删除|打人api/g,'')
        await data.push(api)
        await e.reply(`添加成功~`)
        await getwrite(data)
        return true;
        }
        if (e.msg.includes('删除打人api')){
        let data=await getread()
        if (!data.length > 0) { return e.reply('我说你api都没添加，你删微生物呢？') , true}
        await data.splice(data.indexOf(data), 1)
        await getwrite(data)
        await e.reply(`删除成功~`)
        return true;
        }
       await getwrite(data)
    return false;
}

async ofHitMe(e){

if (!e.isGroup) return false;
 
    let data=await Yaml.getread(path1)
    if (!data) data= [];
    if (data.indexOf(e.group_id) == -1&&e.msg.includes('禁用')){
    await data.push(e.group_id)
    await e.reply(`本群已禁用打人功能~`)
    }
    if (data.indexOf(e.group_id)!== -1&&e.msg.includes('启用')){
    await data.splice(data.indexOf(e.group_id), 1)
    await e.reply(`本群已启用打人功能~`)
    }
    Yaml.getwrite(path1,data)
    return false;
}

async setBotname(e){
    let botname = e.msg.replace(/#?设置打人|Bot|bot|BOT|名字/g, "").trim();
    for (let ban of banword) {
        if (botname.length > 20) {
            let msg= [
                '名字太长了吧...',
            ]
            await e.reply(msg)
        } else if (botname.length == 0) {
            let msg= [
                '呜呜呜我就不配有名字吗',
            ]
            await e.reply(msg)
        } else if (ban === botname){
            let msg = [
                `对不起 你不可以改我的名字！`,
            ]
            await e.reply(msg)
        } else {
            await e.reply('已经设置好了～')
            await redis.set(`dw:botnickname:${e.bot_id}`,botname)
            return false;
        }
    }
}

async HitMe(e){
 
    if (!e.isGroup) return false;

    if(e.isGroup){
    try {
    let group = await Yaml.getread(path1)
        for (let qqq of group) {
            if(e.group_id == qqq){
            return false
            }
        }
        }catch (e){}
    }

    let data = await redis.get(`dw:HitMe:${e.user_id}_cds`); 
    if (data) {
      console.log(data)
      data = JSON.parse(data)
      if (HitMeCD) {
        if (data.num != 0) {
          e.reply([segment.at(e.user_id), `该命令还有` + HitMe_time + `分钟CD~`]);
          return true;
        }
      }
    }

    let botname = await redis.get(`dw:botnickname:${e.bot_id}`)
    if (!botname){
        await e.reply('我还没有名字,可以发送#设置打人bot名字+名字给我设置名字哦~')
        if (botname.length == 0){
            await e.reply('这什么主人啊连名字都不给我 生气')
        return true;
        }
    }
	let random = Math.round(Math.random() * 9);//随机生成 0-9 
	let msg;
    let msgRes;
 	msg = [
   		segment.at(e.user_id),
           `\n今天你的人品是【`,
		 (random+1).toString(),
         `】，啊这 让${botname}满足你吧~`
  	];
    async function sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        })
    }
  	e.reply(msg); //发送消息
  	await sleep(2000) //延时
    for (let i = 0; i <= random; i++) {
  		e.reply(hit[i]);
		e.group.muteMember(e.user_id, MuteTime*(i+1));
		await sleep(2000);
    } 
    if (random => 7){
        let data = getread()
        let api = await data.splice(data.indexOf() * 1)
        let msg = [
        segment.image(`${api}`),
        segment.at(e.user_id),`今天人品太漂亮了,${botname}奖励你一张涩图,快说感谢${botname}吧！`,
        ];
        e.reply(await common.makeForwardMsg(e, [msg])) //发送消息
        redis.set(`dw:HitMe:${e.user_id}_cds`, `{"num":1,"booltime":${HitMeCD}}`, { 
            EX: parseInt(60 * HitMe_time)
        });
        return true; //返回true 阻挡消息不再往下

        } else if (random <= 7){
        let msg = [
        segment.at(e.user_id),`够了吗?`,
        ];
        e.reply(msg); //发送消息
        redis.set(`dw:HitMe:${e.user_id}_cds`, `{"num":1,"booltime":${HitMeCD}}`, { 
            EX: parseInt(60 * HitMe_time)
        });
        return true; //返回true 阻挡消息不再往下
        }  
        return false;
    }

async Hitta(e){


    let setdata = await Yaml.getread(path2)
    let Hitmaster = setdata.Hitmaster
    if (!e.isMaster) {
        if (!(Hitmaster == true)){
        return false
        }
    }

    if (!e.isGroup) return false;

    if(e.isGroup){
    try {
    let group = await Yaml.getread(path1)
        for (let qqq of group) {
            if(e.group_id == qqq){
            return false
            }
        }
        }catch (e){}
    }

    if (e.atall){ e.reply(`${botname}打不过那么多人QAQ`); return true; }
    if (e.atme){ e.reply(`${botname}不能打自己！`); return true; }
    if (!e.at) return false;
    
    let botname = await redis.get(`dw:botnickname:${e.bot_id}`)

    if (!botname){
        await e.reply('我还没有名字,可以发送#设置打人bot名字+名字给我设置名字哦~')
        if (botname.length == 0){
            await e.reply('这什么主人啊连名字都不给我~')
        return true;
        }
    }

    let TA = e.message.find(item => item.type == 'at')?.qq

    try {
    let QH = await Yaml.getread(主人)
    let userQQ = QH.masterQQ;
    for (let qqq of userQQ) {
    if(TA == qqq){e.reply(`${botname}不能打主人！`);return false}}
    }catch (e){}

    let data = await redis.get(`dw:HitMe:${e.user_id}_cds`); 
    if (data) {
      console.log(data)
      data = JSON.parse(data)
      if (HitMeCD) {
        if (data.num != 0) {
          e.reply([segment.at(e.user_id), `该命令还有` + HitMe_time + `分钟CD~`]);
          return true;
        }
      }
    }

	let random = Math.round(Math.random() * 9);//随机生成 0-9 
	let msg;
    let msgRes;
 	msg = [
   		segment.at(TA),
           `\n今天的人品是【`,
		 (random+1).toString(),
         `】，${botname}现在就打他！`
  	];
    async function sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        })
    }
  	e.reply(msg); //发送消息
  	await sleep(2000) //延时
    for (let i = 0; i <= random; i++) {
  		e.reply(hit[i]);
		e.group.muteMember(TA, MuteTime*(i+1));
		await sleep(2000);
    } 
    if (random => 7){
        let data = getread()
        let api = await data.splice(data.indexOf() * 1)
        let msg = [
        segment.image(`${api}`),
        segment.at(TA),`今天人品爆炸,${botname}奖励你一张涩图,快说感谢${botname}！`,
        ];
        e.reply(await common.makeForwardMsg(e, [msg])) //发送消息
        redis.set(`dw:HitMe:${e.user_id}_cds`, `{"num":1,"booltime":${HitMeCD}}`, { 
            EX: parseInt(60 * HitMe_time)
        });
        return true; //返回true 阻挡消息不再往下

        } else if (random <= 7 && e.isMaster){
        let msg = [
        `主人${botname}打完啦！快奖励${botname}(っ●ω●)っ~`,];
        e.reply(msg); //发送消息
        redis.set(`dw:HitMe:${e.user_id}_cds`, `{"num":1,"booltime":${HitMeCD}}`, { 
            EX: parseInt(60 * HitMe_time)
        });
        return true; //返回true 阻挡消息不再往下

        } else if (random <= 7){
        let msg = [
        `打完啦！`,
        ];
        e.reply(msg); //发送消息
        redis.set(`dw:HitMe:${e.user_id}_cds`, `{"num":1,"booltime":${HitMeCD}}`, { 
            EX: parseInt(60 * HitMe_time)
        });
        return true; //返回true 阻挡消息不再往下
        } 
        return false;
    }
}

    //读取api
    function getread(){
    try {
        var fc = fs.readFileSync(path, 'utf8');
        } catch (e) {
        console.log(e);
        return false;
        }
        return YAML.parse(fc);
    }
    
    //写入api
    function getwrite(data){
    try {
        let yaml = YAML.stringify(data);
        fs.writeFileSync(path, yaml, 'utf8');
        return true
        } catch (e) {
        console.log(e);
        return false
        }
    }