angular.module("tap.directives", [])
  .directive "device", ->
    restrict: "A"
    link: ->
      device.init()

  .directive "snapscroll", ->
    restrict: "A"
    link: ->
      device.init()

  .service 'copy', ($sce) ->
    copy =
      about:
        heading: "We manufacture the most advanced CBD vapor product available"
        sub_heading: "Manufactured in the United States, the Digital Vaporizor by CBD Technologies is the first to employ state-of-the-art mechanical design."
        copy: "<p>At CBD Technologies, we focus on the intersection of the highest quality, hand-crafted extract products and the best possible delivery technologies to ensure the experience for our customers is second-to-none.  <br /><br />By utilizing advanced, USA-manufactured vaporizer products, the highest quality CBD-rich Hempstalk oil extracts, and blending all of our e-liquids in a certified GMP facility without the use of Propylene Glycol or other chemicals, the Alcura line of products are not only innovative and effective, but are the safest CBD-rich Hempstalk products available.  We back up every batch of our proprietary e-liquid blends will full testing profiles and maintain the strictest quality control for both our technologies and extracts, guaranteeing a consistent experience every time.  By infusing our e-liquids with just a hint of our all-natural, organic essential oil blends, the entire Alcura product line not only delivers the benefits of CBD-rich Hempstalk extract, but a range of products to fit our customers lifestyles.  <br /><br />From our calming Night lend to our energizing Day blend, the entire Alcura line is designed to delivery maximum care, flavor, and effectiveness. </p>"
      team:
        heading: ""
        bios:
          dave_role: ""
          dave_copy: ""
    


    trustValues = (values) ->
      _.each values, (val, key) ->
        switch typeof(val)
          when 'string'
            $sce.trustAsHtml(val)
          when 'object'
            trustValues(val)

    trustValues(copy)

    copy
