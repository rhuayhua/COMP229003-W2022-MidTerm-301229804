//-----------Name: Rudy Huayhua -------------//
//---------- Student id: 301229804 ----------//
//------------- MidTerm Test ----------------//


// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    });
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    // Here we pass a blank value for the movie property
    let newMovie = Movie();

    res.render(
        'movie/add_edit', 
        {
            title: 'Add a new Movie',
            movie: newMovie, 
        }
    )          

}

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE

    // Here we instantiate and object of the movie-model
    // excluding _id property
    let newMovie = Movie({
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    });

    // Here we pass the object to the create method of the movie-model
    // to add a new movie to the DB
    Movie.create(newMovie, (err, movie) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Here we redirect to the movie list page 
            // after insertion is completed
            //console.log(movie);
            res.redirect('/movie/list');
        }
    });

}

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    
    // Here we get the id of the movie to be updated
    let id = req.params.id;


    // Here we pass the id variable to the movie models's method findById
    // and render the right movie 
    Movie.findById(id, (err, movieToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render(
                'movie/add_edit', 
                {
                    title: 'Edit Movie', 
                    movie: movieToEdit 
                }
            )
        }
    });

}

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE

    // Here we get the id of the movie to be updated
    let id = req.params.id

    //console.log(id);

    // Here we instantiate and object of the movie-model
    // and set the values
    // including _id property
    let updatedMovie = Movie({
        _id: req.body.id,
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    });

    //console.log(updatedMovie);
    
    // Here we use the object instantiated to
    // to update in DB
    Movie.updateOne({_id: id}, updatedMovie, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/movie/list');
        }
    });
    
}

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
    
    // ADD YOUR CODE HERE

    // Here we get the id of the movie to be deleted
    let id = req.params.id;

    // Here we pass the id of the movie to be deleted
    // to the remove method of the movie-model

    Movie.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/movie/list');
        }
    });

}