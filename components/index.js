const Path = process.cwd();
const Plugin_Name = 'Jinmaocuicuisha-plugin'
const Plugin_Path = `${Path}/plugins/${Plugin_Name}`;
import Version from './Version.js'
import Data from './Data.js'
import Common from './Common.js'
import Cfg from './Cfg.js'

export {Common, Cfg, Data, Version, Path, Plugin_Name, Plugin_Path}