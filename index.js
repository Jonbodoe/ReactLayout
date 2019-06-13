class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            font: 'Prompt',
            fullscreen: false,
            color: {
                img: 'img/ygb.png',
                primary: '#ffe4b3',
                secondary: '#46c6ad',
                ternary: '#293744',
                highlight: '#e56e6c'
            },
            edit: {
                title: 'title',
                header: 'header',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis auteirure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur.'
            }
        };
    }
    tabChanger = (index) => {
        this.setState({
            index: index
        });
    }
    fontChanger = (e) => {
        let name = e.target.innerHTML
        this.setState({
            font: name
        })
    }
    colorChanger = (e) => {
        let select = e.target.dataset.key
        if (select === 'img/boy.png') {
            this.setState({
                color: {
                    img: select,
                    primary: '#26393a',
                    secondary: '#ff6c4a',
                    ternary: '#ffeac0',
                    highlight: '#2c9191'
                }
            })
        } else if (select === 'img/rrw.png') {
            this.setState({
                color: {
                    img: select,
                    primary: '#383131',
                    secondary: '#db6c61',
                    ternary: '#ededed',
                    highlight: '#52b7ce'
                }
            })
        } else if (select === 'img/ygb.png') {
            this.setState({
                color: {
                    img: select,
                    primary: '#ffe4b3',
                    secondary: '#46c6ad',
                    ternary: '#293744',
                    highlight: '#e56e6c'
                }
            })
        } else if (select === 'img/wbb.png') {
            this.setState({
                color: {
                    img: select,
                    primary: '#efeded',
                    secondary: '#59b3c1',
                    ternary: '#323233',
                    highlight: '#73eab9'
                }
            })
        } else {
            return
        }

    }
    editText = (e) => {
        let section = e.target.dataset.key
        if (section === '0') {
            this.setState({
                edit: {
                    title: e.target.value,
                    header: this.state.edit.header,
                    text: this.state.edit.text
                }
            })
        } else if (section === '1') {
            this.setState({
                edit: {
                    title: this.state.edit.title,
                    header: e.target.value,
                    text: this.state.edit.text
                }
            })
        } else if (section === '2') {
            this.setState({
                edit: {
                    title: this.state.edit.title,
                    header: this.state.edit.header,
                    text: e.target.value
                }
            })
        }
    }
    expandWindow = () => {
        this.setState({
            fullscreen: !this.state.fullscreen
        })
        console.log(this.state.fullscreen)
    }
    render() {
        let fontList = ['Prompt', 'Vollkorn', 'Raleway', 'Montserrat', 'Rokkitt', 'Rubik',].map((font) => {
            return <li
                style={{ fontFamily: (font) }}
                className={this.state.font === (font) ? 'Font select active' : 'Font select'}
                key={font}
                onClick={this.fontChanger}
            >
                {font}
            </li>
        })
        let colorList = ['img/ygb.png', 'img/rrw.png', 'img/wbb.png', 'img/boy.png'].map((color) => {
            return <li
                className={this.state.color.img === (color) ? 'Color select active' : 'Color select'}
                key={color}
                onClick={this.colorChanger}
            >
                <img className='colorscale' src={color} alt='colors' data-key={color} />
            </li>
        })
        let edit = [
            {
                label: 'title',
                content: this.state.edit.title,
                limit: 8,
            },
            {
                label: 'header',
                content: this.state.edit.header,
                limit: 14,
            },
            {
                label: 'text',
                content: this.state.edit.text,
                limit: 345,
            }
        ].map((text, index) => {
            return <React.Fragment key={index}>
                <div className='label'>{text.label}</div>
                <textarea className='area' value={text.content} data-key={index} maxLength={text.limit} onChange={this.editText}></textarea>
                <div className={text.content.length === text.limit ? 'warning' : 'safe'}>- Character Limit: {text.limit} </div>
            </React.Fragment>
        })
        let tabs = [
            {
                category: 'Font',
                title: 'Pick A Font:',
                info: (fontList)
            },
            {
                category: 'Color',
                title: 'Pick A Color Scheme:',
                info: (colorList)
            },
            {
                category: 'Content',
                title: 'Edit text Content:',
                info: (edit)
            }
        ].map((section, index) => {
            return <div key={index + 1}>
                <div className={index === this.state.index ? 'tabs tabmove' : 'tabs'} key={section} onClick={() => this.tabChanger(index)}>
                    {section.category}
                </div>
                <h2 className={index === this.state.index ? 'title titlefade' : 'title'} key={index}
                >
                    {index === this.state.index ? section.title : ''}
                </h2>
                <div className={index === this.state.index ? 'info infofade' : 'info'}>
                    <ul className={section.category}>
                        {index === this.state.index ?
                            (section.info)
                            : ''}
                    </ul>
                </div>
            </div>
        })
        return (
            <React.Fragment>
                <div id="section2" data-target='#section2'
                >
                    <h1 className='example'>example //</h1>
                    <div id='example' style={{fontFamily:this.state.font}}>
                        <Example
                            light={this.state.color.ternary}
                            medium={this.state.color.secondary}
                            dark={this.state.color.primary}
                            hint={this.state.color.highlight}
                            title={this.state.edit.title}
                            header={this.state.edit.header}
                            text={this.state.edit.text}
                        />
                    </div>
                    <div id='selection' style={this.state.fullscreen ? { width: '0px', flexGrow: 0 } : { width: '17vw', flexGrow: 1 }}>
                        <div className='edit'>editor //</div>
                        {tabs}
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

function Example(props) {
    let shadow = '70px 50px ' + (props.medium)
    return (
        <React.Fragment>
            <div className='screen' style={{ backgroundColor: props.light, boxShadow: shadow, color: props.dark }}>
                <h1 className='header'>
                    <div id='image'>
                        <div className='shape1' style={{ backgroundColor: props.hint }}></div>
                        <div className='shape2' style={{ backgroundColor: props.medium }}></div>
                        <div className='shape3' style={{ backgroundColor: props.medium }}></div>
                        <div className='lineBox'>
                            <div className='line1' style={{ backgroundColor: props.dark }}></div>
                            <div className='line2' style={{ backgroundColor: props.dark }}></div>
                            <div className='line3' style={{ backgroundColor: props.dark }}></div>
                        </div>
                    </div>
                    <div className='exTitle'>{props.title}
                        <span style={{ color: props.hint }}>.</span>
                    </div>
                </h1>
                <div className='textcontainer' style={{ backgroundColor: props.dark }} >
                    <div className='text'>
                        <h2 className='subhead' style={{ color: props.medium }}>
                            {props.header}
                        </h2>
                        <div style={{ color: props.light }}>
                            {props.text}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

let header = '< a react.js project />'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 0
        }
    }
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    };
    trackScrolling = () => {
        this.setState({
            scroll: document.documentElement.scrollTop,
        })
    };
    moveEditor = () => {
        document.documentElement.scrollTo(0, 2000)
    }
    render() {

        return <React.Fragment>
            <div id='section1'>
                <div className='animate'>
                    <img className='logo' src='img/weblogo.png' alt='logo of a webpage' />
                    <img className='logo' src='img/weblogo.png' alt='logo of a webpage' />
                    <img className='logo' src='img/weblogo.png' alt='logo of a webpage' />
                </div>
                <div className='intro'>
                    <nav>
                        <div className='nav-item'>JONBODOE</div>
                        <div className='nav-item'>/</div>
                        <a className='nav-item' href='#'>GITHUB</a>
                    </nav>
                    <div className='main'>
                        <h1>layout <br />customizer</h1>
                        <h2>{header}</h2>
                    </div>
                </div>
            </div>
            <div id='space'>
                <div className={this.state.scroll > 300 ? 'button hideButton' : 'button'} onClick={this.moveEditor}>start</div>
            </div>
        </React.Fragment>
    }
}

function App() {
    return (
        <React.Fragment>
            <Home />
            <Tabs />
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));


