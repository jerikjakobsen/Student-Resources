import Link from "next/link"
import Head from "next/head"
import Router from 'next/router'
import axios from "axios"

/*
TODOS:
- Resize search bar depending on how big the width of the screen is and if the user is logged in or not
- Move the search bar farther away from the account Info section
- Style Search bar
- Add Test Logo in
*/
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            results: [],
            searchFocus: false
        }
    }

    onEnter = (e) => {
        if (e.key === "Enter") {
            const searchQuery = this.state.search.replace(" ", "%20");
            Router.push("/search/[query]", `/search/${searchQuery}`)
        }
    }

    onType = (e) => {
        e.persist()
        this.setState({search: e.target.value}, ()=> {
            if (this.state.search.length === 0) this.setState({results: []})
            if (this.state.search <= 1) return;
            axios.get(`http://localhost:8080/searchProf/${e.target.value}`)
            .then(data => {
                this.setState({results: data.data.professors})
                console.log(this.state.results)
            })
            .catch(err => {
                console.error(err)
            })
        })
        
    }

    onSearchFocus = (e) => {
        this.setState({searchFocus: true})
    }
    onSearchBlur = (e) => {
        this.setState({searchFocus: false})
    }

    render() {
        const {loggedIn, accountName, userID} = this.props
        return (
            <div className="main">
        <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
            <div className="searchMain">
                <div className="icon">
                    <i className="material-icons">search</i>
                </div>
                <input onKeyDown={this.onEnter} onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} type="search" value={this.state.search} onChange={this.onType} placeholder="University, Professor, or Course..."></input>
                <div style={{paddingLeft: "25px", width: "100%"}}>
                { this.state.searchFocus ? this.state.results.map((prof, i) => {
                    const br = this.state.results.length - 1 === i ? "15px" : "0px"
                    const borderBottom = this.state.results.length - 1 == i ? "" : "1px solid black"
                    return (
                                <div style={{width: "100%", backgroundColor: "rgba(119,136,153,0.6)", height: "3rem", borderBottomLeftRadius: br, borderBottomRightRadius: br, borderBottom: borderBottom }}>
                                    <Link href="/professor/[profid]" as={`/professor/${prof._id}`}>
                                        <a className="anc">
                                            {prof.name}
                                        </a>
                                    </Link>
                                    <Link href="/school/[schoolid]" as={`/school/${prof.schoolID}`}>
                                        <a className="schoolanc">{prof.schoolName}</a>
                                    </Link>
                                </div>

                    )
                }) : null}
                </div>
            </div>
            <Link href={loggedIn ? '/liked' : '/login'}>
                <a className="heart anc">
                    <i className="material-icons">{loggedIn ? "favorite" : "favorite_border"}</i>
                </a>
            </Link>
            <Link href={loggedIn ? '/upload' : 'login'}>
                <a className='flex anc'>
                    <i className="material-icons">file_upload</i>
                </a>
            </Link>
            {loggedIn ? <Link href="/user/[userid]" as={`/user/${userID}`}><a className="anc">{accountName}</a></Link> : null}
            {!loggedIn ? <Link href="/login"><a className="anc">Login</a></Link> : null}
            {!loggedIn ? <Link href="/signup"><a className="anc">Sign up</a></Link> : null}
    <style jsx>{`
        .main {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            height: 6rem;
            background: rgb(0,0,0);
            padding: 0 2rem 0 2rem;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px
        }

        .searchMain {
            position: absolute;
            width: 18.5rem;
            height: 1.7rem;
            left: 50%;
            top: 50%;
            margin-left: -11rem;
            margin-top: -.85rem;
        }

        .logo {
            position: absolute;
            top: .65rem;
            left: .5rem;
            width: 32px;
            height: 32px
        }

        .anc {
            text-decoration: none;
            color: rgba(201, 222, 255, .6);
            font-size: 1.4rem;
            margin: 0 .4rem 0 .4rem;
            letter-spacing: .09rem;
            transition: color .5s
        }

        .anc:hover {
            color: rgba(184, 211, 255, .8 );
        }

        .schoolanc {
            text-decoration: none;
            color: rgb(112,128,144);
            fontSize: .8rem;
            display: block;
            margin: .2rem 0 .1rem 0.4rem;
            letter-spacing: .09rem
        }

        .schoolanc:hover {
            color: rgb(86, 96, 107);
        }

        .flex {
            display: flex;
            width: 24px;
        }

        .heart {
            display: flex;
            width: 24px;
            color: rgba(201, 222, 255, .6)
        }

        .heart:hover {
            color: rgba(184, 211, 255, .8 )
        }

        input {
            font-family: 'Raleway', sans-serif;
            height: 100%;
            width: 100%;
            font-size: 1rem;
            border-radius: 25px;
            padding-left: 1.7rem;
            padding-right: 1rem
        }

        input:focus {
            outline: none
        }

        .icon {
            display: inline-block;
            position: absolute;
            top: 50%;
            margin-top: -.6rem;
            left: .2rem
        }
    `}</style>
    </div>
        )
    }
}

export default Navbar