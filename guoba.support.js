import setting from './Cfg/utils/setting.js'
import lodash from 'lodash'
import { pluginResources } from './Cfg/utils/path.js'
import path from 'path'

// 支持锅巴
export function supportGuoba () {
  let allGroup = []
  Bot.gl.forEach((v, k) => { allGroup.push({ label: `${v.group_name}(${k})`, value: k }) })
  return {
    pluginInfo: {
      name: 'Jinmaocuicuisha-plugin',
      title: 'Jinmaocuicuisha-plugin',
      author: '@JMCCS @小雨',
      authorLink: 'https://gitee.com/JMCCS',
      link: 'https://gitee.com/SHIKEAIXYY/Jinmaocuicuisha-plugin',
      isV3: true,
      isV2: false,
      description: '提供一些没啥用的功能',
      icon: 'bi:box-seam',
      iconColor: '#7ed99e',
      iconPath: path.join(pluginResources, 'resources/肾虚的脆脆鲨/ccslogo.png')
    },
    // 配置项信息
    configInfo: {
      schemas: [{
        component: 'Divider',
        label: '通用设置'
      },
      {
        field: 'ckck.ckck',
        label: '选择骂人文字词库',
        bottomHelpMessage: '由轻到重-完整的词库在群文件',
        component: "Select",
        required: true,
          componentProps: {
            options: [
              { label: "默认词库(无内容)", value: 1 },
              { label: "可爱词库(撒娇语录)", value: 3 },
              { label: "愤怒词库(口吐芬芳)", value: 4 },
              { label: "暴怒词库(火力全开)", value: 2 },
            ],
            placeholder: "请选择词库",
          },
    },
      {
        field: '绝对主人.绝对主人',
        label: '绝对主人',
        bottomHelpMessage: '添加绝对主人的QQ号',
        component: 'InputNumber',
        component: 'Input',
        required: true,
        componentProps: {
          placeholder: '请输入QQ'
        }
      },
        {
          field: 'Hitmaster.Hitmaster',
          label: '打主人',
          bottomHelpMessage: '是否允许打主人',
          component: "Select",
          required: true,
            componentProps: {
              options: [
                { label: "允许", value: true },
                { label: "不允许", value: false },
              ],
              placeholder: "请选择是否允许",
            },
      },
      {
        field: '自动撤回.自动撤回',
        label: '自动撤回',
        bottomHelpMessage: '是否开启自动撤回',
        component: "Select",
        required: true,
          componentProps: {
            options: [
              { label: "不开启", value: true },
              { label: "开启", value: false },
            ],
            placeholder: "请选择是否开启",
          },
    },
    {
      field: '自动撤回时间.自动撤回时间',
      label: '自动撤回时间',
      bottomHelpMessage: '选择撤回时间',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 0,
        max: 20000,
        placeholder: '请输入数字'
      }
    },
      ],
      getConfigData () {
        return setting.merge()
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData (data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, setting.merge, config)
        setting.analysis(config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}
