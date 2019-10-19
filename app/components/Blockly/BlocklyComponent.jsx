import React from 'react';
import './BlocklyComponent.css';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

class BlocklyComponent extends React.Component {
    componentDidMount() {
        const { initialXml, children, ...rest } = this.props;
        console.log('this.props ', this.props);
        this.primaryWorkspace = Blockly.inject(
            this.blocklyDiv,
            {
                toolbox: this.toolbox,
                ...rest
            },
        );

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace);
        }
    }

    get workspace() {
        return this.primaryWorkspace;
    }

    setXml(xml) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace);
    }

    render() {
        const { children, code } = this.props;
        console.log('code en el blocklycomponent', code);
        console.log('children del component ', children);
        return (<React.Fragment>
          <div id="container-flex">
            <div ref={e => this.blocklyDiv = e} id="blocklyDiv" />
            <textarea id="codeContainer" ref={e => this.codeContainer = e} value={code}/>
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={(toolbox) => { this.toolbox = toolbox; }}>
                {children}
            </xml>
          </div>
        </React.Fragment>);
    }
}

export default BlocklyComponent;
