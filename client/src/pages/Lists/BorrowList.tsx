/** @jsxImportSource @emotion/react */
import Reservation from '../../components/Reservation';
import { css } from '@emotion/react';
import { color, rem, flex, textDecorationNone, host } from '../../common';
import ListTab from '../../components/ListTab';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { Button } from '../../components/Button';
import emptyBorrow from '../../assets/pictures/emptyBorrow.svg';
import { container, section, message } from './tab';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  borrows,
  showCompleteModal,
  showConfirmModal,
  showReviewModal,
  showSubmitModal,
  UserPost,
} from '../../Atom';
import { useEffect, useState } from 'react';
import YesOrNo from '../../components/ConfirmBorrow';
import axios from 'axios';
import Complete from '../../components/Complete';
import ReviewModal from '../../components/ReviewModal';

interface Borrow {
  reservation: List[];
}

interface List {
  id: number;
  users_id: number;
  posts_id: number;
  reservation_dates: string[];
  reservation_status: number;
  posts: UserPost;
}

function BorrowList() {
  const [borrowLists, setBorrowLists] = useRecoilState<Borrow>(borrows);
  const [confirm, setConfirm] = useRecoilState(showConfirmModal);
  const [complete, setComplete] = useRecoilState(showCompleteModal);
  const [review, setReview] = useRecoilState(showReviewModal);
  const [submit, setSubmit] = useRecoilState(showSubmitModal);
  const button = ['예약 취소', '반납하기', '반납 확인 대기 중', '반납 완료'];
  const [reservationId, setReservationId] = useState(0);
  const [reservationStatus, setReservationStatus] = useState(0);
  const [userId, setUserId] = useState(0);
  const printStatusText = (status: number) => button[status - 1];

  const onButtonClick = (id: number, status: number, userId: number) => {
    setReservationId(id);
    setReservationStatus(status);
    setUserId(userId);
    setConfirm(true);
  };

  const onCompleteClick = () => {
    setComplete(false);
    if (reservationStatus === 2) {
      setReview(true);
    }
  };

  const onReviewCompleteClick = () => {
    setSubmit(false);
  };

  // useEffect(() => {
  //   axios
  //     .get(`${host}/userinfo/product/borrow`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setBorrowLists(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // });

  return (
    <>
      <ListTab />
      <nav css={[container, flex]}>
        <Link to="/lists/borrowlist" css={[link, visit]}>
          빌린 목록
        </Link>
        <Link to="/lists/lendlist" css={link}>
          빌려준 목록
        </Link>
        <Link to="/lists/likelist" css={link}>
          찜한 목록
        </Link>
        <Link to="/lists/resistlist" css={link}>
          내가 쓴 글
        </Link>
      </nav>
      <div css={container}>
        {confirm &&
          ((reservationStatus === 1 && (
            <YesOrNo
              reservationId={reservationId}
              reservation_status={1}
              text={'예약 취소'}
              title={'예약 취소'}
              text1={`예약을 취소하시겠습니까?`}
              text2={`대여자가 예약을 수락하기 전까지 취소할 수 있습니다.`}
            />
          )) ||
            (reservationStatus === 2 && (
              <YesOrNo
                reservationId={reservationId}
                reservation_status={2}
                text={'반납하기'}
                title={'반납하기'}
                text1={`반납하시겠습니까?`}
                text2={`대여자가 상품 회수 후 반납 확인 시 최종 반납 처리가 됩니다.`}
              />
            )))}
        {complete &&
          (reservationStatus === 1 ? (
            <Complete text="예약이 취소되었습니다" onClick={onCompleteClick} />
          ) : (
            <Complete text="반납이 완료되었습니다" onClick={onCompleteClick} />
          ))}
        {review && <ReviewModal userId={userId} />}
        {submit && (
          <Complete
            text="리뷰가 등록되었습니다."
            onClick={onReviewCompleteClick}
          />
        )}
        {borrowLists['reservation'].length === 0 ? (
          <>
            <img src={emptyBorrow} alt="camping" />
            <p css={message}>
              빌린 목록이 없어요! <br />
              캠핑용품을 대여해서 즐거운 캠핑을 떠나보세요!
            </p>
            <Button
              text="캠핑 용품 보러 가기"
              width={`${rem(180)}`}
              height={`${rem(43)}`}
              background="white"
              color={`${color.mid}`}
              border={`1px solid ${color.mid}`}
              size={`${rem(14)}`}
              cursor={'pointer'}
              hover="80%"
            />
          </>
        ) : (
          <section css={section}>
            {borrowLists['reservation'].map(
              (borrowList: List, index: number) => (
                <Reservation
                  key={index}
                  text={printStatusText(borrowList.reservation_status)}
                  background={
                    borrowList.reservation_status !== 4
                      ? `${color.point}`
                      : `${color.mid}`
                  }
                  color="white"
                  cursor={
                    borrowList.reservation_status === 1 ||
                    borrowList.reservation_status === 2
                      ? 'pointer'
                      : 'not-allowed'
                  }
                  hover={
                    borrowList.reservation_status === 4
                      ? '100%'
                      : borrowList.reservation_status === 3
                      ? '50%'
                      : '80%'
                  }
                  opacity={borrowList.reservation_status === 3 ? '50%' : '100%'}
                  postId={borrowList.posts.id}
                  img_urls={borrowList.posts.img_urls}
                  address={borrowList.posts.address}
                  title={borrowList.posts.title}
                  deposit={borrowList.posts.deposit}
                  rental_fee={borrowList.posts.rental_fee}
                  reservation_dates={borrowList.reservation_dates}
                  onButtonClick={() =>
                    onButtonClick(
                      borrowList.id,
                      borrowList.reservation_status,
                      borrowList.posts.users_id,
                    )
                  }
                />
              ),
            )}
          </section>
        )}
      </div>
    </>
  );
}

export default BorrowList;
