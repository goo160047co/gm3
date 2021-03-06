/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 Dan "Ducky" Little
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** React.Component for rendering a toolbar!
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startService } from '../../actions/service';
import { runAction, setUiHint } from '../../actions/ui';

export class ToolbarButton extends React.Component {
    render() {
        const tool = this.props.tool;

        return (
            <button
                onClick={() => {
                    this.props.onClick(tool);
                }}
                key={tool.name}
                className={'tool ' + tool.name}
                title={tool.label}
            >
                <span className='icon'></span><span className='label'>{tool.label}</span>
            </button>
        );
    }
}

ToolbarButton.defaultProps = {
    onClick: (tool) => {
    },
};

ToolbarButton.propTypes = {
    tool: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

function mapDispatch(dispatch) {
    return {
        onClick: (tool) => {
            if(tool.actionType === 'service') {
                // start the service
                dispatch(startService(tool.name));
                // give an indication that a new service has been started
                dispatch(setUiHint('service-start'));
            } else if(tool.actionType === 'action') {
                dispatch(runAction(tool.name));
            }
        }
    };
}

export default connect(undefined, mapDispatch)(ToolbarButton);
