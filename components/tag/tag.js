Component( {
  options: {
    multipleSlots: true
  },
  externalClasses: [
    'tag-class'

  ],
  data: {
  },
  properties: {

    title: String,

  },
  methods: {
    onTap ( event )
    {
      this.triggerEvent( 'tapping', {
        text: this.properties.title
      } )

    }
  }
} )