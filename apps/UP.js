import plugin from '../../../lib/plugins/plugin.js'
import { execSync } from 'child_process'
import { update } from '../model/update.js'
import fs from 'fs'
import { Version, Common, Plugin_Name } from '../components/index.js'

let mst=`./plugins/${Plugin_Name}/Cfg/绝对主人.yaml`
let Attl=`./plugins/${Plugin_Name}/Cfg/自动撤回.yaml`
let chtime=`./plugins/${Plugin_Name}/Cfg/自动撤回时间.yaml`
let c=`./plugins/${Plugin_Name}/Cfg/Ciku/1.yaml`
let Hitmaster=`./plugins/${Plugin_Name}/Cfg/Hitmaster.yaml`
let Loadhelp=`./plugins/${Plugin_Name}/Cfg/Loadhelp.yaml`
//let drapi=`./plugins/${Plugin_Name}/Cfg/api.yaml`
let u = './plugins/example/Jinmaocuicuisha.js'
if(!fs.existsSync(u)) {fs.copyFile('./plugins/Jinmaocuicuisha-plugin/Cfg/Sys/jmccs.txt',u,(err)=>{if(err){logger.info(err)}})}

if(!fs.existsSync(mst)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/绝对主人.txt`,mst,(err)=>{
	if(err){
    logger.info(err)}
    })
}
if(!fs.existsSync(Attl)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/自动撤回.txt`,Attl,(err)=>{
	if(err){
    logger.info(err)}
    })
}
if(!fs.existsSync(chtime)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/自动撤回时间.txt`,chtime,(err)=>{
	if(err){
    logger.info(err)}
    })
}
if(!fs.existsSync(c)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/1.txt`,c,(err)=>{
	if(err){
    logger.info(err)}
    })
}
if(!fs.existsSync(Hitmaster)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/Hitmaster.txt`,Hitmaster,(err)=>{
	if(err){
    logger.info(err)}
    })
}
if(!fs.existsSync(Loadhelp)) {
    fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/Loadhelp.txt`,Loadhelp,(err)=>{
	if(err){
    logger.info(err)}
    })
}
//if(!fs.existsSync(drapi)) {
//   fs.copyFile(`./plugins/${Plugin_Name}/Cfg/Sys/api.txt`,Loadhelp,(err)=>{
//	if(err){
//    logger.info(err)}
//    })
//}

export class jmccs_update extends plugin {
	constructor () {
		super({
			/** 功能名称 */
			name: '脆脆鲨插件更新',
			/** 功能描述 */
			dsc: '调用Yunzai自带更新模块进行插件更新',
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 5000,
			rule: [
				{
					/** 命令正则匹配 */
					reg: '^#?脆脆鲨(插件)?(强制)?更新$',
					/** 执行方法 */
					fnc: 'update_plugin'
				},
                {
					/** 命令正则匹配 */
					reg: '^#?脆脆鲨(插件)?版本$',
					/** 执行方法 */
					fnc: 'plugin_version',
				},
				{
					/** 命令正则匹配 */
					reg: '^#?脆脆鲨(插件)?(更新)?日志$',
					/** 执行方法 */
					fnc: 'update_log',
                }
			]
		});
	}
	
    
	async update_plugin(){


        if (!this.e.isMaster){
            //判断qq 不是主人也可以更新（仅限本插件）
            if (!(this.e.user_id==2471344750)){
                if (!(this.e.user_id==536606294)){
                return false;
                }
            }
        }

		let Update_Plugin = new update();
		Update_Plugin.e = this.e;
		Update_Plugin.reply = this.reply;
		
		if(Update_Plugin.getPlugin(Plugin_Name)){
			if(this.e.msg.includes('强制')){
                if (!this.e.isMaster) 
                {return false}
				await execSync('git reset --hard',{cwd: `${process.cwd()}/plugins/${Plugin_Name}/`});
			}
			await Update_Plugin.runUpdate(Plugin_Name);
			if(Update_Plugin.isUp){
			setTimeout(() => Update_Plugin.restart(), 2000)
			}
		}
		return true;
	}
async plugin_version(){
  return versionInfo(this.e);
}
async update_log(){
  let Update_Plugin = new update();
  Update_Plugin.e = this.e;
  Update_Plugin.reply = this.reply;
  
  if(Update_Plugin.getPlugin(Plugin_Name)){
    this.e.reply(await Update_Plugin.getLog(Plugin_Name));
  }
  return true;
}
}
async function versionInfo (e) {
  return await Common.render('help/version-info', {
    currentVersion: Version.ver,
    changelogs: Version.logs,
    elem: 'cryo'
  }, { e, scale: 1.4 })
}
