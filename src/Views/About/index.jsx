import React, {Component} from 'react';

import './index.css';

import {NavBar, Icon} from "antd-mobile";

import Footer from '../../Components/Footer';

class Index extends Component {
  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182',color:'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >关于我们</NavBar>

        <div className="about-layout">
          <h3>关于毅恒</h3>
          <p className='info1'>毅恒基金管理有限公司是在香港成立的私募基金管理公司之一。公司总部设香港，在广州、北京、上海、深圳、杭州、和合肥均设有分公司，同时在新加坡及纽约设有子公司。
            毅恒基金定位于专注、专心、专业的私募基金管理公司，服务范围主要以私募基金和机构业务为核心，涵盖毅恒资本、毅恒投行的专业化资产管理平台。毅恒基金一贯保持规范运作、稳健经营，且以雄厚的综合实力维持自身在行业中的领先地位。</p>
          <p className='info2'>
            公司核心团队拥有<span> 15 </span>年投资管理经验，管理单只基金规模超过<span> 10 </span>亿美元，高管团队均来自国内外顶尖投行，成功操作案例：<span>中烟香港06055</span>、<span>中国医疗08225</span>、<span>自动系统00771</span>、<span>集友股份603429</span>、<span>济民制药603222</span>、<span>毛记葵涌01716</span>、<span>管道工程01865</span>、<span>信基沙溪03603</span>等。毅恒基金秉承“为信任成就托付”的企业宗旨，注重将投资收益及时转化为红利，为投资人创造了丰厚的回报。
            毅恒基金在业内最早提出了“大势所趋、创造价值”的投资理念，以卓越的主动投资管理为核心，建立了业内最大的投研团队，通过宏观趋势判断、策略研究以及实地调研，财务与会计信息、管理层讨论与分析、审视每一个投资标的基本面及投资潜力，制定严格的“募、投、管、退”风控原则，力求为投资者提供长期而稳定的投资收益。
            毅恒基金拥有卓越的平台、雄厚的实力以及良好的声誉，汇聚了大批优秀的研究员及基金经理，选拔了海内外知名机构的优秀人才，构建了精英荟萃的投研平台，逐步形成了业内规模强大的投资团队，并形成了稳定而长远的投资管理模式。
          </p>
          <p className="info2">
            在私募基金方面，毅恒基金建立了完善的基金产品线，管理过私募基金超过<span> 60 </span>只，服务过的客户超过<span> 10000 </span>人次，可以满足不同投资者的各类投资需求。管理的基金囊括了货币型、理财型、债券型、混合型以及PE股权型等<span> 5 </span>大类不同风险收益特征的品种。
          </p>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Index;