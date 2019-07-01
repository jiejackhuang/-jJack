Component( {
  data: {},
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    }
  },
  methods: {
    onGetUserInfo ( e )
    {
      console.log( e.detail );

      this.triggerEvent( 'getuserinfo', e.detail, {} )
    }


  }
} )