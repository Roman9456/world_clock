import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment/moment';

function TimezonesList({ locationsArray, deleteItem }) {
  const [time, setTime] = useState({
    locationsArray,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < time.locationsArray.length; i++) {
        const element = time.locationsArray[i];
        element.time = moment(element.time).add(1, 's');
      }
      setTime(prevTime => ({ ...prevTime }));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th className="text-center">Название</th>
          <th className="text-center">Время</th>
          <th className="text-center">Действия</th>
        </tr>
      </thead>
      <tbody>
        {time.locationsArray.map((elem, i) =>
          <tr key={i}>
            <td className="text-center align-middle">{elem.name}</td>
            <td className="text-center align-middle">{elem.time.format("DD.MM.YYYY hh:mm:ss")}</td>
            <td className="text-center">
              <Button type="button" variant="outline-danger" data-id={elem.name} onClick={deleteItem}>Удалить</Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

TimezonesList.propTypes = {
  locationsArray: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TimezonesList;