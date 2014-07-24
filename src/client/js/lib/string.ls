if !String.prototype.trim
  String.prototype.trim = ->
    @replace /^\s+|\s+$/g, ''

String.prototype.ltrim = ->
    @replace /^\s+/g, ''

String.prototype.rtrim = ->
    @replace /\s+$/g, ''
