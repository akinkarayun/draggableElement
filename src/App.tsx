import React from 'react';
import './App.css';

function App() {
  // const [constValue, setConstValue] = React.useState(0);
  // const increment = () => {
  //   setConstValue(constValue + 1)
  // }
  // const clear = () => {
  //   setConstValue(0)
  // }
  // const decrement = () => {
  //   if (constValue > 0) setConstValue(constValue - 1)
  // }
  const draggable = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('.container')

  draggable.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })

  containers.forEach(container => {
    container.addEventListener('dragover', (e: any) => {
      e.preventDefault()
      const afterElement = getDragelement(container, e.clientY)
      const draggable = document.querySelector('.dragging')

      if (afterElement == null) {
        if (draggable) container.append(draggable)
      } else {
        if (draggable)
          container.insertBefore(draggable, afterElement)
      }
    })

  })

  function getDragelement(container: any, y: number) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }

    }, { offset: Number.NEGATIVE_INFINITY }).element


  }


  return (
    <>
      <div className='container'>
        <p className='draggable' draggable={true}>1</p>
        <p className='draggable' draggable={true}>2</p>



      </div>
      <div className='container'>
        <p className='draggable' draggable={true}>3</p>
        <p className='draggable' draggable={true}>4</p>
      </div>
    </>


  );
}

export default App;
