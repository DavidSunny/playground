export default (async function readList(req, reply) {
  const { place, people } = req.query;

  // Read any databases here..
  const mockList = [
    {
      id: '0',
      title: `당신이 좋아할 ${place} 야경`,
      price: 650000,
      imgUrl: '/assets/img/night-view.jpg',
    },
    {
      id: '1',
      title: `당신이 지내고 싶은 ${place} ${people}인 숙소`,
      price: 600000,
      imgUrl: '/assets/img/house-view.jpg',
    },
    {
      id: '2',
      title: `당신과 함께 할 ${place} 해변가`,
      price: 500000,
      imgUrl: '/assets/img/beach-view.jpg',
    },
  ];

  return reply.status(200).json(mockList);
});
