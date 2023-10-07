import plugin from "../../../lib/plugins/plugin.js"
import fetch from 'node-fetch'
import YAML from 'yaml'
import Yaml from '../Yaml/Yaml.js'
import fs from 'fs'
import { Cfg } from '../components/index.js'
const _path = process.cwd();

let path='./plugins/Jinmaocuicuisha-plugin/Cfg/qq.yaml'
let rectime='./plugins/Jinmaocuicuisha-plugin/Cfg/自动撤回时间.yaml'
let Attl='./plugins/Jinmaocuicuisha-plugin/Cfg/自动撤回.yaml'

if (!fs.existsSync(path)) {fs.writeFileSync(path,'')}

export class Automaticwithdrawalset extends plugin {
    constructor() {
		super({
			name: '自动撤回开关',
			dsc: '自动撤回开关',
			event: 'message',
			priority: 50,
			rule: [
                {   /** 命令正则匹配 */
                    reg: '^#?设置自动撤回时间(\\d)+(秒)?$',
                    /** 执行方法 */
                    fnc: 'recalltime',
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?本群(关闭|开启)自动撤回$',
                    /** 执行方法 */
                    fnc: 'Automaticwithdrawalset',
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?(关闭|开启)自动撤回$',
                    /** 执行方法 */
                    fnc: 'Automaticwithdrawalsetres',
                }
            ]
        })
    }

    async recalltime(e){

    if (!e.isMaster)  {return false}
        let Cfgtime = await Yaml.getread(rectime)
        let recalltime = e.msg.replace(/#|设置自动撤回时间|秒/g,'')
        let 时间 = recalltime
        recalltime = recalltime*1000
        Cfgtime.自动撤回时间 = recalltime
        await Yaml.getwrite(rectime, Cfgtime)
        e.reply(`自动撤回时间,成功设置为${时间}秒`)
        return false;
    }

    async Automaticwithdrawalset(e) {

    if (!e.isMaster)  {return false}
 
        let data = await Yaml.getread(path)
        if (!data) data = [];
        if (data.indexOf(e.group_id) == -1&&e.msg.includes('本群关闭自动撤回')){
        await data.push(e.group_id)
        await e.reply(`本群已关闭自动撤回ฅ( ̳• · • ̳ฅ)`)
        }
        if (data.indexOf(e.group_id)!== -1&&e.msg.includes('本群开启自动撤回')){
        await data.splice(data.indexOf(e.group_id), 1)
        await e.reply(`本群已开启自动撤回ฅ( ̳• · • ̳ฅ)`)
        }
        Yaml.getwrite(path,data)
        return false;
    }

    async Automaticwithdrawalsetres(e) {

    if (!e.isMaster)  {return false}
     
        let data = await Yaml.getread(Attl)
        if (data.自动撤回 && e.msg.includes('开启自动撤回')){
        data.自动撤回 = false;
        await e.reply(`已开启自动撤回( ̳• · • ̳ฅ)`)
        }
        if (!data.自动撤回 && e.msg.includes('关闭自动撤回')){
        data.自动撤回 = true;
        await e.reply(`已关闭自动撤回( ̳• · • ̳ฅ)`)
        }
        Yaml.getwrite(Attl,data)
        return false;
    }

}
