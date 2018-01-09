import React from 'react';
import PropTypes from 'prop-types';

import './UserCard.css';

const UserCard = ({ userDetail }) => {
    const { avatar_url, bio, blog, name, login, html_url, followers, followers_url, following, following_url, location, public_repos, total_private_repos, repos_url } = userDetail;


    // const backgroundStyle = {
    //     position: "fixed",
    //     zIndex: '-99',
    //     width: '100%',
    //     height: '100%'
    // };


    return (
        <div className="UserCard">
            {/* <div style={backgroundStyle}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/W0LHTWG-UmQ?autoplay=1&controls=0&showinfo=0&autohide=1" frameBorder="0" allowFullScreen></iframe>
            </div> */}

            <header>
                <Title name={name} login={login} url={html_url} />
            </header>
            <main>
                <section>
                    <img src={avatar_url} />
                </section>
                <section>
                    <div className="UserCard-bio">{bio}</div>
                    <hr className="UserCard-bio_location-separator" />
                    <div className="UserCard-location">
                        <svg ariaHidden="true" className="octicon octicon-location" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                        {location}
                    </div>
                    <div className="UserCard-blog">
                        <svg aria-hidden="true" className="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
                        <a href={blog}>{blog}</a>
                    </div>
                    {
                        <div className="UserCard-follow">
                            <span>Public repos: <a href={repos_url}>{public_repos} </a></span>
                            <span>Private repos: <a href={repos_url}>{total_private_repos} </a></span>
                            <span>Followers: <a href={followers_url}>{followers} </a></span>
                            <span>Following: <a href={following_url}>{following} </a></span>
                        </div>
                    }
                </section>
            </main>
        </div>
    );
};
UserCard.propTypes = {
    userDetail: PropTypes.object.isRequired
};

const Title = ({ name, login, url }) => {
    return (
        <div className="UserCard-title">
            <span>Graph for {name} (<a href={url}>{login}</a>)</span>
        </div>
    );
};
Title.propTypes = {
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    url: PropTypes.string
};


export default UserCard;


