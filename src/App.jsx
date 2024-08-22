// react
import { useState } from 'react';

// bootstrap element
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

// moment
import moment from 'moment/moment';

// components
import TimezonesList from '../components/TimezonesList';

function App() {
  const [form, setForm] = useState({
    name: '',
    timezone: 0,
    locations: [],
  });

  const handleSubmit = (evt) => {
    // отменяем отправку данных
    evt.preventDefault();

    // если не заполнено имя
    if (form.name.length === 0) {
      return;
    }

    // проверяем, существует ли введённое название    
    let exists = false;
    for (let i = 0; i < form.locations.length; i++) {
      const element = form.locations[i];
      if (element.name.toUpperCase() === form.name.toUpperCase()) {
        exists = true;
        break;
      }
    }

    // не существует - добавляем
    if (!exists) {
      const time = moment.utc().add(form.timezone, 'h');
      form.locations.push({ name: form.name, timezone: form.timezone, time });
    } else { // существует
      alert('Указанное название уже добавлено!');
    }

    // очищаем данные формы
    form.name = '';
    form.timezone = 0;

    // обновляем визуальную часть
    setForm(prevForm => ({ ...prevForm }));
  };

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    if (name === 'locationTimezone') {
      value = parseInt(value, 10);
    }
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const deleteItem = (evt) => {
    for (let i = 0; i < form.locations.length; i++) {
      if (form.locations[i].name === evt.target.dataset.id) {
        form.locations.splice(i, 1);
      }
    }

    setForm(prevForm => ({ ...prevForm }));
  }

  return (
    <Container className='mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Введите название</Form.Label>
          <Form.Control 
            type="text"
            id="locationName"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Введите название"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Выберите временную зону</Form.Label>
          <Form.Control 
            type="number"
            id="locationTimezone"
            name="timezone"
            value={form.timezone}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>

      <TimezonesList locationsArray={form.locations} deleteItem={deleteItem}/>
      
    </Container>
  )
}

export default App
