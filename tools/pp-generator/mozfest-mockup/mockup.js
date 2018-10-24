var allowedDataTypes = {
  "location": "location",
  "contact": "contact details"
}

var locationDataCollection = {
  user: "locationDataCollectionUser",
  services: "locationDataCollectionServices"
}

var locationDataCollectionWords = {
  user: "As reported by the user on the website",
  services: "Location services supplied by the user's device"
}


var locationDataUsePurposeWords = {
  marketing: "Delivering targeted marketing",
  obligation: "Fulfilling our legal obligations"
}


var locationDataUseBasisWords = {
  consent: "Consent",
  contract: "Contractual obligation",
  legInterest: "Legitimate business interests",
  vitInterest: "Vital interests",
  public: "Fulfilment of a public task",
  obligation: "Legal obligation"
}


var locationDataUseDurationWords = {
  indefinite: "An indefinite period",
  "6months": "6 months",
  "3months": "3 months",
  "1month": "1 month",
  "2weeks": "2 weeks"
}


var generatePolicy = function () {
  var dataType = $(".selDataType").val()
  var collectionType = $(".selCOllectionType").val()

  var locationDataCollectionTypes = []

  for (var k in locationDataCollection) {
    if (typeof locationDataCollection[k] !== "function") {
      if ($("#" + locationDataCollection[k]).prop("checked")) {
        locationDataCollectionTypes.push(locationDataCollectionWords[k])
      }
    }
  }

  var newline = `
`

  var nest = function (n) {
    if (n > 1) {
      return " " + nest(n - 1)
    } else {
      return " - "
    }
  }

  var s = ""
  s += `## Location data` + newline + newline

  s += `Location data will be collected in the following ways:` + newline
  s += newline

  for (var k in locationDataCollectionTypes) {
    s += nest(2) + `${locationDataCollectionTypes[k]}` + newline
  }

  s += newline

  s += `Location data will be used in the following ways:` + newline
  s += newline

  s += nest(2) + "For the purpose of: " +
    locationDataUsePurposeWords[$("#locationDataUsePurpose").val()]
  s += newline
  s += nest(2) + "Which has a legal basis in: " +
    locationDataUseBasisWords[$("#locationDataUseBasis").val()]

  s += newline
  s += nest(2) + "The data will be stored for: " +
    locationDataUseDurationWords[$("#locationDataUseDuration").val()]

  s += newline
  s += newline
  s += `Location data will be shared with the following purposes with the following parties:`
  s += newline
  s += newline
  s += nest(2) + locationDataUsePurposeWords[$("#locationDataSharePurpose").val()]
  s += newline
  s += newline
  $("#locationDataShareText").val().split(";").forEach(t => {
    s += nest(4) + t.trim() + newline
  })

  $("#markdownOutput").text(s)

}

var giveWordsToSliders = function () {
  var lookup = ["Not acceptable", "Warn me", "Hesitant", "Acceptable"]

  var sliders = ["userLocationPurposesMarketing",
    "userLocationPurposesLegal",
    "userLocationPurposes3rdMarketing",
    "userLocationPurposes3rdLegal"
  ]

  for (var k = 0; k < sliders.length; k++) {
    $("#" + sliders[k] + "Span").text(lookup[($("#" + sliders[k])).val() - 1])
  }
}

var randomScore = function(){
  $("#userScore").text("" + (70 + Math.floor(Math.random()*10)) + "%")
}

var update = function(){
  generatePolicy()
  giveWordsToSliders()
  randomScore()
}

var comparePolicy = function (policyMarkdown) {

}
$(function(){
  $("input").change(update)
  $("select").change(update)
  update()
})