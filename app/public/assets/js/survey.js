/**
 * Created by mikhailmetrikin on 4/27/17.
 */
$(document).ready(function () {
  'use strict';

    $('#submit-profile').on('click', () => {
      // There's no need to wrap the handler inside of an ajax callback since you're not using any of the results from it.
      // Also, you may as well define your user object on the smallest scope possible so you don't have to
      // be as concerned with state management. Defining your user here gives you the peace of mind that it
      // will always be what you see below. Defining it outside means you can't assign properties to it until
      // you're sure they're ready to be posted to your server and that's unnecessary mental overhead.
      let user = {
        name: $('#name').val().trim(),
        photo: $('#photo').val().trim(),
        scores: []
      };

      if (!user.name || !user.photo) {
        // TODO: Maybe a modal added here
        alert('Please Enter both your name and a source for an image');
        return;
      }

      let done = true;

      $('.chosen-select').each(function () {
        let option = $(this).val();
        if (!option) {
          alert('Please answer all of the questions');
          done = false;
          return done;
        }
        user.scores.push(option);
      });

      if (!done) return;

      $.post('/api/friends', user).done(response => {
        $('#match-name').text(response.name);
        $('#match-img').attr({
          src: response.photo,
          alt: response.name
        });
        $('#results-modal').modal();
      });
    });

});
