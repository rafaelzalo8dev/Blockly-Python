import React from 'react';
import './BlocklyComponent.css';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';
import { Block, Value, Field, Shadow, Category, Separator } from 'components/Blockly';
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
              <Category name="Variables" colour="#a55b80" custom="VARIABLE" />
              <Category name="Text" colour="#5ba58c">
                <Block type="text">
                   <Field name="TEXT" />
                </Block>
                <Block type="text_print">
                   <Value name="TEXT">
                   </Value>
                </Block>
                <Block type="text_changeCase">
                   <Field name="CASE">UPPERCASE</Field>
                </Block>
                <Block type="text_append">
                   <Field name="VAR" id="]-wAnB=H71,Ke.IAnaJj">item</Field>
                   <Value name="TEXT">
                   </Value>
                </Block>
                <Block type="text_length">
                   <Value name="VALUE">
                   </Value>
                </Block>
                <Block type="text_getSubstring">
                   <mutation at1="true" at2="true" />
                   <Field name="WHERE1">FROM_START</Field>
                   <Field name="WHERE2">FROM_START</Field>
                   <Value name="STRING">
                      <Block type="variables_get">
                         <Field name="VAR" id="hap-HM`}wxFzYerZ3qXu">text</Field>
                      </Block>
                   </Value>
                </Block>
                <Block type="text_indexOf">
                   <Field name="END">FIRST</Field>
                   <Value name="VALUE">
                   </Value>
                   <Value name="FIND">
                      <Shadow type="text">
                         <Field name="TEXT">abc</Field>
                      </Shadow>
                   </Value>
                </Block>
                <Block type="text_join">
                   <mutation items="2" />
                </Block>
                <Block type="text_charAt">
                   <mutation at="true" />
                   <Field name="WHERE">FROM_START</Field>
                   <Value name="VALUE">
                      <Block type="variables_get">
                         <Field name="VAR" id="hap-HM`}wxFzYerZ3qXu">text</Field>
                      </Block>
                   </Value>
                </Block>
              </Category>
              <Category name="Lists" colour="#745ba5">
                <Block type="lists_create_with">
                   <mutation items="4" />
                </Block>
                <Block type="lists_indexOf">
                   <Field name="END">FIRST</Field>
                   <Value name="VALUE">
                      <Block type="variables_get">
                         <Field name="VAR" id="gDJGB;k/,rOcw;teB3So">list</Field>
                      </Block>
                   </Value>
                </Block>
                <Block type="lists_repeat">
                   <Value name="NUM">
                      <Shadow type="math_number">
                         <Field name="NUM">5</Field>
                      </Shadow>
                   </Value>
                </Block>
                <Block type="lists_length" />
                <Block type="lists_isEmpty" />

                <Block type="lists_getIndex">
                   <mutation statement="false" at="true" />
                   <Field name="MODE">GET</Field>
                   <Field name="WHERE">FROM_START</Field>
                   <Value name="VALUE">
                      <Block type="variables_get">
                         <Field name="VAR" id="gDJGB;k/,rOcw;teB3So">list</Field>
                      </Block>
                   </Value>
                </Block>
              </Category>
              <sep />
              <Category name="Math" colour="#5b67a5">
                <Block type="math_round">
                   <Field name="OP">ROUND</Field>
                   <Value name="NUM">
                      <Shadow type="math_number">
                         <Field name="NUM">3.1</Field>
                      </Shadow>
                   </Value>
                </Block>
                <Block type="math_number">
                   <Field name="NUM">0</Field>
                </Block>
                <Block type="math_single">
                   <Field name="OP">ROOT</Field>
                   <Value name="NUM">
                      <Shadow type="math_number">
                         <Field name="NUM">9</Field>
                      </Shadow>
                   </Value>
                </Block>
                <Block type="math_constant">
                   <Field name="CONSTANT">PI</Field>
                </Block>
                <Block type="math_arithmetic">
                   <Field name="OP">ADD</Field>
                </Block>
                <Block type="math_on_list">
                   <mutation op="SUM" />
                   <Field name="OP">SUM</Field>
                </Block>
                <Block type="math_modulo">
                </Block>
                <Block type="math_random_int">
                   <Value name="FROM">
                      <Shadow type="math_number">
                         <Field name="NUM">1</Field>
                      </Shadow>
                   </Value>
                   <Value name="TO">
                      <Shadow type="math_number">
                         <Field name="NUM">100</Field>
                      </Shadow>
                   </Value>
                </Block>
              </Category>
              <Category name="Logic" colour="#5b80a5">
                <Block type="controls_if" />
                <Block type="logic_compare">
                   <Field name="OP">EQ</Field>
                </Block>
                <Block type="logic_operation">
                   <Field name="OP">AND</Field>
                </Block>
                <Block type="logic_negate" />
                <Block type="logic_boolean">
                   <Field name="BOOL">TRUE</Field>
                </Block>
                <Block type="logic_null" />
                <Block type="logic_ternary" />
              </Category>
              <sep />
              <Category name="Loops" colour="#5ba55b">
                <Block type="controls_repeat_ext">
                   <Value name="TIMES">
                      <Shadow type="math_number">
                      </Shadow>
                   </Value>
                </Block>
                <Block type="controls_whileUntil">
                   <Field name="MODE">{'WHILE'}</Field>
                </Block>
                <Block type="controls_for">
                   <Field name="VAR" id="bIywjwW}EGY^,`/o4Yg_">i</Field>
                   <Value name="BY">
                      <Shadow type="math_number">
                         <Field name="NUM">1</Field>
                      </Shadow>
                   </Value>
                </Block>
                <Block type="controls_forEach">
                   <Field name="VAR" id="h|UvWVkv?BIRA|Nz+9k8">item</Field>
                </Block>
              </Category>
              <Category name="Functions" colour="#995ba5" custom="PROCEDURE" />
            </xml>
          </div>
        </React.Fragment>);
    }
}

export default BlocklyComponent;
