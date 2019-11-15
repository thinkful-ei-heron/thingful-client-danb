import React, { Component } from 'react'
import ThingListContext from '../../contexts/ThingListContext'
import ThingApiService from '../../services/thing-api-service'
import { Section } from '../../components/Utils/Utils'
import ThingListItem from '../../components/ThingListItem/ThingListItem'
import './ThingListPage.css'
import TokenService from '../../services/token-service'

export default class ThingListPage extends Component {
  static contextType = ThingListContext

  componentDidMount() {
    this.context.clearError()
    ThingApiService.getThings()
      .then(this.context.setThingList)
      .catch(this.context.setError)
  }

  renderThings() {
    const { thingList = [] } = this.context
    console.log('yellow unicorn', thingList)
      return thingList.map(thing =>
        <ThingListItem
          key={thing.id}
          thing={thing}
        />
    )
    if(TokenService.hasAuthToken()) {

    }
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='ThingListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderThings()}
      </Section>
    )
  }
}
