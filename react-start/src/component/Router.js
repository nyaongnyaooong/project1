import { Link } from 'react-router-dom';
// import { useAsync } from "react-async";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  return (
    <div className="content_box visible ani_fadeIn" id="home">
      <p>
        Hello Blog
        {/* <!-- 안녕하세요
        현재 NodeJS를 사용하여 Back-End 개발 공부 중 입니다

        https://github.com/nyaongnyaooong
        https://career.programmers.co.kr/pr/luckyyou123_7068

        HTML CSS JavaScript NodeJS MongoDB MySQL --> */}

        {/* <!-- <svg width="32" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg> --> */}

        {/* <!-- <path fill-rule="evenodd" clip-rule="evenodd" d="M10 10h60c5.523 0 10 4.477 10 10v60c0 5.523-4.477 10-10 10H10C4.477 90 0 85.523 0 80V20c0-5.523 4.477-10 10-10z" fill="#202B3D"></path> --> */}

      </p>
    </div>
  )
}

const Blog = () => {
  return (
    <div className="content_box ani_fadeIn" id="blog">
      <p>
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
      </p>
    </div>
  )
}

const Board = () => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/board/data");
        console.log(response);
        setBoardData(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function TableCell(props) {
    return (
      <tr>
        <td className="title">
          <span>{props.title}</span>
        </td>
        <td className="author">
          <span>{props.author}</span>
        </td>
        <td className="view">
          <span>{props.view}</span>
        </td>
        <td className="created">
          <span>{props.created}</span>
        </td>
      </tr>
    );
  }

  const array = [];
  boardData.forEach(e => {
    array.push(
      <TableCell key={e.id} title={e.title} author={e.author} view={e.id} created={e.created}></TableCell>
    );
  });

  return (
    <div className="content_box ani_fadeIn" id="board">
      <Link to={"/board/write"}>
        <span>글쓰기</span>
      </Link>
      <table className="">
        <tbody className="boardTable">
          <TableCell title="제목" author="글쓴이" view="조회수" created="날짜"></TableCell>
          {array}
        </tbody>
      </table>

    </div>
  )
}

const BoardNew = () => {
  return (
    <div className="content_box ani_fadeIn" id="board">
      <div>
        title
      </div>
      <div>
        content
      </div>
      <a href="/board/write/post"><span>write</span></a>

    </div>
  )
}

export { Home, Blog, Board, BoardNew }; 