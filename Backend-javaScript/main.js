import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// https://www.w3docs.com/snippets/javascript/how-to-add-days-to-javascript-date.html
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.resetTime = function () {
    let date = new Date(this.valueOf());
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getSmallestAvailableNumber(takenNumbers) {

    takenNumbers = takenNumbers.sort((a, b) => Number(a) - Number(b));
    let currentNumber = 1;
    for (let number of takenNumbers) {
        if (currentNumber < number) {
            console.log('new id:' + currentNumber);
            return currentNumber;
        } else {
            currentNumber = number + 1;
        }
    }
    return currentNumber;
}

function getDateFromProjection(projection) {
    let projectionDate = projection['date'].split('.');
    let projectionTime = projection['time'].split(':');

    return new Date(projectionDate[2], projectionDate[1] - 1, projectionDate[0], projectionTime[0], projectionTime[1]);
}

//---- endpointy filmów
// dodawanie filmu
app.post('/films', (req, res) => {
    fs.readFile('./data/films.json', 'utf8', (error, filmsJson) => {
        if (error) {
            console.log('Could not read file (in POST /films): ' + error)
            res.status(500).send('Could not read films file');
            return;
        }
        let films = JSON.parse(filmsJson);

        let newFilm = {}
        newFilm['id'] = getSmallestAvailableNumber(films.map(f => Number.parseInt(f.id)));
        newFilm['title'] = String(req.body.title);
        newFilm['duration'] = Number(req.body.duration);

        if (req.body.imageUrl) {
            newFilm['imageUrl'] = String(req.body.imageUrl);
        }

        films.push(newFilm);

        fs.writeFile('./data/films.json', JSON.stringify(films), (error) => {
            if (error) {
                console.log('Could not write films.json file in POST /films');
                res.status(500).send('Error writing films.json file');
            } else {
                console.log('POST /films/');
                res.status(201).send(newFilm);
            }
        });
    })
})

// edycja filmu
app.put('/films/:id', (req, res) => {
    fs.readFile('./data/films.json', 'utf8', (error, filmsJson) => {
        if (error) {
            console.log('Could not read file (in PUT /films/id): ' + error)
            res.status(500).send('Could not read films file');
            return;
        }
        let films = JSON.parse(filmsJson);
        let filmToEditIndex = films.findIndex(f => f.id == req.params.id);

        let editedFilm = {}
        if (filmToEditIndex < 0) {
            editedFilm['id'] = getSmallestAvailableNumber(films.map(f => f['id']))
        } else {
            editedFilm['id'] = Number(films[filmToEditIndex].id);
        }
        editedFilm['title'] = String(req.body.title);
        editedFilm['duration'] = Number(req.body.duration);

        if (req.body.imageUrl) {
            editedFilm['imageUrl'] = String(req.body.imageUrl);
        }

        if (filmToEditIndex < 0) {
            films.push(editedFilm);
        } else {
            films[filmToEditIndex] = editedFilm;
        }

        fs.writeFile('./data/films.json', JSON.stringify(films), (error) => {
            if (error) {
                console.log('Could not write films.json file in PUT /films/' + req.params.id);
                res.status(500).send('Error writing films.json file');
            } else {
                console.log('PUT /films/' + req.params.id);
                if (filmToEditIndex < 0) {
                    res.status(201).send(editedFilm);
                } else {
                    res.send(editedFilm);
                }
            }
        });
    })
})

// usuwanie filmu
app.delete('/films/:id', (req, res) => {
    fs.readFile('./data/films.json', 'utf8', (error, filmsJson) => {
        if (error) {
            console.log('Could not read file (in DELETE /films/id): ' + error)
            res.status(500).send('Could not read films file');
            return;
        }

        fs.readFile('./data/projections.json', 'utf8', (projectionsError, projectionsJson) => {
            if (projectionsError) {
                console.log('Could not read file (in DELETE /films/id): ' + error)
                res.status(500).send('Could not read projections file');
                return;
            }

            let projections = JSON.parse(projectionsJson);
            let newProjections = [];
            for (let projection of projections) {
                console.log(projection);
                if (!(projection.filmId == req.params.id)) {
                    newProjections.push(projection);
                }
            }
            fs.writeFile('./data/projections.json', JSON.stringify(newProjections), (error) => {
                if (error) {
                    console.log('Could not write projections.json file in DELETE /films/' + req.params.id);
                    res.status(500).send('Error writing projections.json file');
                } 
            });

            let films = JSON.parse(filmsJson);
            let filmToDeleteIndex = films.findIndex(f => f.id == req.params.id);
            if (filmToDeleteIndex < 0) {
                console.log('Could not find film with id: ' + req.params.id);
                res.status(500).send('Could not find film with id: ' + req.params.id);
                return;
            }
            films.splice(filmToDeleteIndex, 1);
            fs.writeFile('./data/films.json', JSON.stringify(films), (error) => {
                if (error) {
                    console.log('Could not write films.json file in DELETE /films/' + req.params.id);
                    res.status(500).send('Error writing films.json file');
                } else {
                    console.log('DELETE /films/' + req.params.id);
                    res.status(204).send('Film deleted');
                }
            });
        })
    })
});

// pobranie informacji o filmie
app.get('/films/:id', (req, res) => {
    fs.readFile('./data/films.json', 'utf8', (error, filmsJson) => {
        if (error) {
            console.log('Could not read films.json file (in GET /films/id): ' + error)
            res.status(500).send('Could not read films file');
            return;
        }
        let films = JSON.parse(filmsJson);
        let foundFilm = films.find(f => f.id == req.params.id);
        if (!foundFilm) {
            console.log('Could not find film with id: ' + req.params.id);
            res.status(500).send('Could not find film with id: ' + req.params.id);
            return;
        }
        console.log('GET /films/id' + req.params.id);
        res.send(JSON.stringify(foundFilm));
    })
});

// pobranie wszystkich projekcji dotyczących danego filmu
app.get('/films/:id/projections', (req, res) => {
    fs.readFile('./data/projections.json', 'utf8', (error, projectionsJson) => {
        if (error) {
            console.log('Could not read projections.json file (in GET /films/id/projections): ' + error)
            res.status(500).send('Could not read projections file');
            return;
        }
        let projections = JSON.parse(projectionsJson);
        let foundProjections = projections.filter((proj) => proj['filmId'] == req.params.id);
        console.log('GET /films/' + req.params.id + '/projections');
        res.send(JSON.stringify(foundProjections));
    })
});

// pobranie wszystkich filmów
app.get('/films', (req, res) => {
    fs.readFile('./data/films.json', 'utf8', (error, filmsJson) => {
        if (error) {
            console.log('Could not read films.json file (in GET /films): ' + error)
            res.status(500).send('Could not read films file');
            return;
        }
        let films = JSON.parse(filmsJson);
        console.log('GET /films');
        res.send(JSON.stringify(films));
    })
})
//-------------------

//---- endpointy sal
// odczytanie informacji o sali
app.get('/rooms/:nr', (req, res) => {
    fs.readFile('./data/rooms.json', 'utf8', (error, roomsJson) => {
        if (error) {
            console.log('Could not read rooms.json file (in GET /rooms/nr): ' + error)
            res.status(500).send('Could not read rooms file');
            return;
        }
        let rooms = JSON.parse(roomsJson);
        let foundRoom = rooms.find(r => r.nr == req.params.nr);
        if (!foundRoom) {
            console.log('Could not find room with number: ' + req.params.nr);
            res.status(500).send('Could not find room with number: ' + req.params.nr);
            return;
        }
        console.log('GET /rooms/nr' + req.params.nr);
        res.send(JSON.stringify(foundRoom));
    })
});

app.get('/rooms', (req, res) => {
    fs.readFile('./data/rooms.json', 'utf8', (error, roomsJson) => {
        if (error) {
            console.log('Could not read rooms.json file (in GET /rooms): ' + error)
            res.status(500).send('Could not read rooms file');
            return;
        }
        let rooms = JSON.parse(roomsJson);
        console.log('GET /rooms/' + req.params.nr);
        res.send(JSON.stringify(rooms));
    })
});
//-------------------

//---- endpointy projekcji filmowych
// dodawanie projekcji
app.post('/projections', (req, res) => {
    fs.readFile('./data/projections.json', 'utf8', (error, projectionsJson) => {
        if (error) {
            console.log('Could not read projections file (in POST /projections): ' + error)
            res.status(500).send('Could not read projections file');
            return;
        }
        let projections = JSON.parse(projectionsJson);

        fs.readFile('./data/films.json', 'utf8', (filmsError, filmsJson) => {
            if (filmsError) {
                console.log('Could not read films file (in POST /projections): ' + filmsError)
                res.status(500).send('Could not read films file');
                return;
            }
            let films = JSON.parse(filmsJson);

            fs.readFile('./data/rooms.json', 'utf8', (roomsError, roomsJson) => {
                if (roomsError) {
                    console.log('Could not read rooms file (in POST /projections): ' + roomsError)
                    res.status(500).send('Could not read rooms file');
                    return;
                }
                let rooms = JSON.parse(roomsJson);

                let projectionFilm = films.find(f => f.id == req.body['filmId']);

                if (!projectionFilm) {
                    console.log('Could not find projection film with id:' + req.body['filmId'] + ' (in POST /projections)')
                    res.status(500).send('Could not find projection film with id:' + req.body['filmId']);
                    return;
                }

                let projectionRoom = rooms.find(r => r.nr == req.body['roomNr']);

                if (!projectionRoom) {
                    console.log('Could not find projection room with id:' + req.body['roomNr'] + ' (in POST /projections)')
                    res.status(500).send('Could not find projection room with id:' + req.body['roomNr']);
                    return;
                }

                let newProjection = {}
                newProjection['id'] = getSmallestAvailableNumber(projections.map(p => Number.parseInt(p.id)));
                newProjection['date'] = String(req.body.date);
                newProjection['time'] = String(req.body.time);
                newProjection['filmId'] = Number(req.body['filmId']);
                newProjection['roomNr'] = Number(req.body['roomNr']);
                newProjection['soldTicketsCount'] = 0;
                newProjection['availableTicketsCount'] = Number(projectionRoom['numberOfSeats']);
                newProjection['reservedSeatsNumbers'] = [];

                projections.push(newProjection);

                fs.writeFile('./data/projections.json', JSON.stringify(projections), (error) => {
                    if (error) {
                        console.log('Could not write projections.json file in POST /projections');
                        res.status(500).send('Error writing projections file');
                    } else {
                        console.log('POST /projections/');
                        res.status(201).send(newProjection);
                    }
                });
            });
        });
    })
});

// edycja projekcji
app.put('/projections/:id', (req, res) => {
    fs.readFile('./data/projections.json', 'utf8', (error, projectionsJson) => {
        if (error) {
            console.log('Could not read projections file (in POST /projections): ' + error)
            res.status(500).send('Could not read projections file');
            return;
        }
        let projections = JSON.parse(projectionsJson);

        fs.readFile('./data/films.json', 'utf8', (filmsError, filmsJson) => {
            if (filmsError) {
                console.log('Could not read films file (in POST /projections): ' + filmsError)
                res.status(500).send('Could not read films file');
                return;
            }
            let films = JSON.parse(filmsJson);

            fs.readFile('./data/rooms.json', 'utf8', (roomsError, roomsJson) => {
                if (roomsError) {
                    console.log('Could not read rooms file (in POST /projections): ' + roomsError)
                    res.status(500).send('Could not read rooms file');
                    return;
                }
                let rooms = JSON.parse(roomsJson);

                let projectionFilm = films.find(f => f.id == req.body['filmId']);

                if (!projectionFilm) {
                    console.log('Could not find projection film with id:' + req.body['filmId'] + ' (in PUT /projections/id)')
                    res.status(500).send('Could not find projection film with id:' + req.body['filmId']);
                    return;
                }

                let projectionRoom = rooms.find(r => r.nr == req.body['roomNr']);

                if (!projectionRoom) {
                    console.log('Could not find projection room with id:' + req.body['roomNr'] + ' (in PUT /projections/id)')
                    res.status(500).send('Could not find projection room with id:' + req.body['roomNr']);
                    return;
                }

                let projectionIndex = projections.findIndex(p => p.id == req.params.id);

                let editedProjection = {}
                if (projectionIndex < 0) {
                    editedProjection['id'] = getSmallestAvailableNumber(projections.map(p => Number.parseInt(p.id)));
                } else {
                    editedProjection['id'] = projections[projectionIndex]['id'];
                }
                editedProjection['date'] = String(req.body.date);
                editedProjection['time'] = String(req.body.time);
                editedProjection['filmId'] = Number(req.body['filmId']);
                editedProjection['roomNr'] = Number(req.body['roomNr']);

                if (projectionIndex < 0) {
                    editedProjection['soldTicketsCount'] = 0;
                    editedProjection['availableTicketsCount'] = Number(projectionRoom['numberOfSeats']);
                    editedProjection['reservedSeatsNumbers'] = [];
                } else {
                    editedProjection['soldTicketsCount'] = Number(projections[projectionIndex]['soldTicketsCount']);
                    editedProjection['availableTicketsCount'] = Number(projections[projectionIndex]['availableTicketsCount']);
                    editedProjection['reservedSeatsNumbers'] = projections[projectionIndex]['reservedSeatsNumbers'];
                }

                if (projectionIndex < 0) {
                    projections.push(editedProjection);
                } else {
                    projections[projectionIndex] = editedProjection
                }

                fs.writeFile('./data/projections.json', JSON.stringify(projections), (error) => {
                    if (error) {
                        console.log('Could not write projections.json file in POST /projections');
                        res.status(500).send('Error writing projections file');
                    } else {
                        if (projectionIndex < 0) {
                            console.log('PUT /projections/id');
                            res.status(201).send(editedProjection);
                        } else {
                            console.log('PUT /projections/id');
                            res.status(200).send(editedProjection);
                        }
                    }
                });
            });
        });
    })
})

// kupienie biletu
app.post('/projections/:id/reservations', (req, res) => {
    fs.readFile('./data/projections.json', 'utf8', (error, projectionsJson) => {
        if (error) {
            console.log('Could not read projections file (in POST /projections/id/reservations): ' + error)
            res.status(500).send('Could not read projections file');
            return;
        }
        let projections = JSON.parse(projectionsJson);

        fs.readFile('./data/rooms.json', 'utf8', (roomsError, roomsJson) => {

            if (roomsError) {
                console.log('Could not read rooms file (in POST /projections/id/reservations): ' + roomsError)
                res.status(500).send('Could not read rooms file');
                return;
            }
            let rooms = JSON.parse(roomsJson);

            let projection = projections.find(p => p.id == req.params.id);

            if (!projection) {
                console.log('Could not find projection with id:' + req.params.id + ' (in POST /projections/id/reservations)')
                res.status(500).send('Could not find projection with id:' + req.params.id);
                return;
            }

            let projectionRoom = rooms.find(r => r.nr == projection['roomNr']);

            if (!projectionRoom) {
                console.log('Could not find projection room with number:' + projection.roomNr + ' (in POST /projections/id/reservations)')
                res.status(500).send('Could not find projection room with id:' + projection.roomNr);
                return;
            }

            let reservationSeatsNumbers = req.body.seats;

            if (reservationSeatsNumbers) {

                // sprawdzenie, czy wszystkie numery miejsc na sali są w odpowiednim zakresie (jeżeli nie, to rządznie jest odrzucane)
                for (let seatNumber of reservationSeatsNumbers) {
                    if (seatNumber > projectionRoom['numberOfSeats'] || seatNumber < 1) {
                        console.log('Seat number: ' + seatNumber + ' is not in range 1-' + projectionRoom['numberOfSeats'] + ' (in POST /projections/id/reservations)')
                        res.status(500).send('Seat number: ' + seatNumber + ' is not in range 1-' + projectionRoom['numberOfSeats']);
                        return;
                    }
                }

                let uniqueSeatsNumbers = reservationSeatsNumbers.filter((value, index, array) => array.indexOf(value) === index);

                // sprawdzenie, czy numery miejsc nie są już zajęte
                for (let seatNumber of uniqueSeatsNumbers) {
                    if (projection['reservedSeatsNumbers'].findIndex(n => n == seatNumber) >= 0) {
                        console.log('Seat number: ' + seatNumber + ' is already reserved (in POST /projections/id/reservations)')
                        res.status(500).send('Seat number: ' + seatNumber + ' is already reserved');
                        return;
                    }
                }

                // dodanie rezerwacji
                if (uniqueSeatsNumbers.length > projection['availableTicketsCount']) {
                    console.log('More seats in reservation than available seats (in POST /projections/id/reservations)')
                    res.status(500).send('Seat number: ' + seatNumber + ' is not in range 1-' + projectionRoom['numberOfSeats']);
                    return;
                }

                for (let seatNumber of uniqueSeatsNumbers) {
                    if (projection['availableTicketsCount'] > 0) {
                        projection['reservedSeatsNumbers'].push(Number(seatNumber))
                        projection['availableTicketsCount']--;
                        projection['soldTicketsCount']++;
                    }
                }

                fs.writeFile('./data/projections.json', JSON.stringify(projections), (error) => {
                    if (error) {
                        console.log('Could not write projections.json file in POST /films');
                        res.status(500).send('Error writing projections file');
                    } else {
                        console.log('POST /projections/');
                        res.status(201).send(req.body.seats);
                    }
                });
            } else {
                console.log('No seats specified in POST request for /projections/id/reservations');
                res.status(500).send('No seats specified');
            }

        });
    })
});

// pobranie projekcji dla danego dnia
app.get('/projections/date/:date', (req, res) => {
    fs.readFile('./data/projections.json', 'utf8', (error, projectionsJson) => {
        if (error) {
            console.log('Could not read projections file (in POST /projections/id/reservations): ' + error)
            res.status(500).send('Could not read projections file');
            return;
        }
        let projections = JSON.parse(projectionsJson);

        let date = req.params.date;
        let day = date.substr(0, 2);
        let month = date.substr(2, 2);
        let year = date.substr(4, 4);

        let fromDate = new Date(year, month - 1, day).resetTime();
        let toDate = new Date(year, month - 1, day).resetTime().addDays(1);

        let foundProjections = projections.filter((proj) => {
            let projDate = getDateFromProjection(proj);
            return projDate >= fromDate && projDate >= (new Date()) && projDate < toDate;
        });

        res.send(foundProjections);
    })
});
//-------------------

app.listen(8080, () => console.log('Server started ad: http://localhost:8080'));