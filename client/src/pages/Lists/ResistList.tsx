/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyWriting from '../../assets/pictures/emptyWriting.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { container, section, message } from './tab';
import Product from '../../components/Product';

const img = css`
  margin-top: ${rem(21)};
`;

function ResistList() {
  return (
    <>
      <ListTab />
      <nav css={[container, flex]}>
        <Link to="/lists/borrowlist" css={link}>
          빌린 목록
        </Link>
        <Link to="/lists/lendlist" css={link}>
          빌려준 목록
        </Link>
        <Link to="/lists/likelist" css={link}>
          찜한 목록
        </Link>
        <Link to="/lists/resistlist" css={[link, visit]}>
          내가 쓴 글
        </Link>
      </nav>
      <div css={container}>
        {/* //? 리스트가 하나도 없을 때
        <img src={emptyWriting} alt="broken heart" css={img} />
        <p css={message}>
          내가 쓴 글이 없어요!
          <br />
          캠핑 용품이 있다면 대여 게시글을 올려보세요!
        </p>
        <Button
          text="글 쓰러 가기"
          width={`${rem(180)}`}
          height={`${rem(43)}`}
          background="white"
          color={`${color.mid}`}
          border={`1px solid ${color.mid}`}
          size={`${rem(14)}`}
          cursor={'pointer'}
          hover="80%"
        /> */}
        <section css={section}>
          {/* //? display: none이므로 isFill은 아무 값이나 넣어도 됨 */}
          <Product isFill={false} display="none" />
          <Product isFill={false} display="none" />
          <Product isFill={false} display="none" />
        </section>
      </div>
    </>
  );
}

export default ResistList;
