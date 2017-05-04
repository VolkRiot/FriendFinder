/**
 * Created by mikhailmetrikin on 4/27/17.
 */
$(document).ready(function() {
  'use strict'

  $.get('/api/friends').done(response => {
    let friends = response
    let match
    let user = {}

    $('#submit-profile').on('click', () => {
      let name = $('#name').val().trim()
      let photo = $('#photo').val().trim()

      if (!name || !photo) {
        // TODO: Maybe a modal added here
        alert('Please Enter both your name and a source for an image')
        return
      }

      user.name = name;
      user.photo = photo;
      let answers = [];
      let done = true;

      $('.chosen-select').each(function() {
        let option = $(this).val()
        if (!option) {
          // TODO: Logic to indicate that player did not answer all q's
          alert('Please answer all of the questions')
          done = false;
          return done;
        }
        answers.push(option);
      });

      if(!done) return
      user.scores = answers

      $.post('/api/friends', user).done(response => {
        match = response
        $("#match-name").text(response.name)
        $("#match-img").attr({
          src: response.photo,
          alt: response.name
        })
        $("#results-modal").modal()

      })
    })
  })
})
