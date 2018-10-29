import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// eslint-disable-next-line
import brace from 'brace';  // Even though unused this import is required for the editor
import AceEditor from 'react-ace';

import { debounce } from '../tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

@inject('projectStore')
@observer
class CodeEditor extends React.Component {
    render() {
        const { projectStore } = this.props;

        return (
            <AceEditor
                mode='javascript'
                theme='tomorrow'
                name='codeEditor'
                width='100%'
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={false}
                showGutter={false}
                highlightActiveLine={true}
                value={projectStore.currentPageContent}
                editorProps={{ $blockScrolling: Infinity }}
                setOptions={{
                    showLineNumbers: false,
                    tabSize: 2
                }}
                style={{
                    display: 'flex',
                    height: '100%'
                }}
            />
        );
    }

    onChange = debounce((value) => {
        const { projectStore } = this.props;

        projectStore.savePageContent(projectStore.projectName, projectStore.selectedPage, value);
    }, 1000);
}

CodeEditor.propTypes = {
    projectStore: PropTypes.object
}

export default CodeEditor;
