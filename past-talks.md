---
layout: default
title: Past Talks
---
<!-- Generates a page with all past talks -->

<div class="docs-section no-top-border" id="past">
  <div class="docs-header">Past Talks</div>
{% assign now_ts = "now" | date: "%s" | plus: 0 %}
{% assign talks = site.talks | sort: "datetime" | reverse %}
{% assign filtered_talks = "" | split: "" %}


{% for talk in talks %}
  {% assign talk_ts = talk.datetime | date: "%s" | plus: 0 %}
  {% if talk_ts < now_ts %}
    {% assign filtered_talks = filtered_talks | push: talk %}
  {% endif %}
{% endfor %}



{% for talk in filtered_talks %}
{% assign talk_ts = talk.datetime | date: "%s" | plus: 0 %}
  {% if talk_ts < now_ts %}
   <div class="talk-item">
     <b>{{ talk.title }}</b><br>
     <b>{{ talk.speaker.name }}</b>
     (<i>{{ talk.speaker.affiliation }}</i>)<br>
     {{ talk.datetime | date: "%B %d, %Y" }}
     {% if talk.links.slides != "" %}
        <br><a href="{{ talk.links.slides }}">Link to Slides</a>
     {% endif %}
     {% if talk.links.video != "" %}
        <br><a href="{{ talk.links.video }}">Link to Video</a>
     {% endif %}
   </div>
   <br>
   {{ talk.content }}
  {% endif %}
{% endfor %}






</div>
