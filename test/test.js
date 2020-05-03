var describe = require('mocha').describe
var it = require('mocha').it
var chai = require('chai')
const helper = require('../src/utils/twitch_api_helper')

describe('Twitch API response', () => {
  beforeEach(() => {
    twitchStreamBody = {
      data: [
        {
          id: '1444883489',
          user_id: '76508554',
          user_name: 'Anomaly',
          game_id: '516575',
          type: 'live',
          title: '[DROPS 🔴] 12+ HOUR RANKED STREAM (GLOBAL ELITE)',
          viewer_count: 38008,
          started_at: '2020-05-03T11:00:24Z',
          language: 'en',
          thumbnail_url:
            'https://static-cdn.jtvnw.net/previews-ttv/live_user_anomaly-{width}x{height}.jpg',
          tag_ids: [
            '6ea6bca4-4712-4ab9-a906-e3336a9d8039',
            'c2542d6d-cd10-4532-919b-3d19f30a768b'
          ]
        }
      ],
      pagination: {}
    }

    twitchNotStreamingBody = {
      data: [],
      pagination: {}
    }

    twitchGameBody = {
      data: [
        {
          id: '516575',
          name: 'VALORANT',
          box_art_url:
            'https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-{width}x{height}.jpg'
        }
      ]
    }

    twitchEmptyGameBody = {
      data: []
    }
  })

  describe('Extract streaming data from response', () => {
    it('should return true when streaming', () => {
      chai.assert.isTrue(helper.isStreaming(twitchStreamBody))
    })
    it('should return false if not streaming', () => {
      chai.assert.isFalse(helper.isStreaming(twitchNotStreamingBody))
    })
  })

  describe('Extract game data from response', () => {
    it('should return game name when body is not empty', () => {
      chai.assert.equal(helper.extractGameName(twitchGameBody), 'VALORANT')
    })
    it('should return null when body is empty', () => {
      chai.assert.equal(helper.extractGameName(twitchEmptyGameBody), null)
    })
  })
})
