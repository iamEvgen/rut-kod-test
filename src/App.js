import React, { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Список дел',
      items: [
        { id: 1, title: 'Убраться' },
        { id: 2, title: 'Выкинуть мусор' },
        { id: 3, title: 'Посмотреть ТВ' },
      ],
    },
    {
      id: 2,
      title: 'В процессе',
      items: [
        { id: 4, title: 'Купить продукты' },
        { id: 5, title: 'Выучить TypeScript' },
        { id: 6, title: 'Разобраться с Redux' },
      ],
    },
    {
      id: 3,
      title: 'Завершено',
      items: [
        { id: 7, title: 'Продать корову' },
        { id: 8, title: 'Найти клад' },
        { id: 9, title: 'Покататься на велосипеде' },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === 'board__item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      board.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className="App">
      {boards.map((board) => (
        <div className="board">
          <h2 className="board__title">{board.title}</h2>
          {board.items.map((item) => {
            return (
              <div
                className="board__item"
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
