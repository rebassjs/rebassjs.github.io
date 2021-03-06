import React from 'react'
import { Flex, Box, Text } from 'rebass'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Location } from '@reach/router'
import Sidepane from 'sidepane'
import NavLink from './NavLink'

const query = graphql`
  query SidebarQuery {
    site {
      siteMetadata {
        navigation {
          text
          href
        }
        github
      }
    }
  }
`

const breakpoint = 'screen and (min-width:40em)'

const removeSlash = str => str.replace(/\/$/, '')

const Pagination = ({
  navigation = []
}) =>
<Location
  children={({ location }) => {
    const i = navigation.findIndex(n => n.href === removeSlash(location.pathname))
    const previous = navigation[i - 1]
    const next = navigation[i + 1]

    if (i < 0) return false

    return (
      <Flex py={4}>
        {previous && (
          <NavLink to={previous.href}>
            <Text fontSize={0}>
              Previous
            </Text>
            <Text fontSize={3}>
              {previous.text}
            </Text>
          </NavLink>
        )}
        <Box mx='auto' />
        {next && (
          <NavLink to={next.href}>
            <Text fontSize={0}>
              Next
            </Text>
            <Text fontSize={3}>
              {next.text}
            </Text>
          </NavLink>
        )}
      </Flex>
    )
  }}
/>

export default props => {
  const { site } = useStaticQuery(query)
  const { navigation, github } = site.siteMetadata

  return (
    <Flex>
      <Sidepane>
        <Box
          width={[ 256 ]}
          px={2}
          py={3}
          bg='white'
          style={{
            minHeight: '100vh'
          }}>
          {navigation.map(({ text, href }) => (
            <NavLink
              key={href}
              to={href}
              children={text}
            />
          ))}
          <Box my={4} />
          {github && <NavLink href={github} children='GitHub' />}
          <NavLink href='https://jxnblk.com' children='Made by Jxnblk' />
        </Box>
      </Sidepane>
      <Box
        {...props}
        mx='auto'
        px={4}
        py={4}
        width={1}
        style={{
          minWidth: 0,
          maxWidth: 768,
          minHeight: '100vh',
        }}>
        {props.children}
        <Pagination navigation={navigation} />
      </Box>
    </Flex>
  )
}
