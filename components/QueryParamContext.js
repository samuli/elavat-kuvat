import { QueryParamProvider as ContextProvider } from "use-query-params"
import { useState, useContext, createContext, useReducer } from "react"
import React, { memo, useMemo } from "react"
import { useRouter } from "next/router"

export const QueryParamProviderComponent = ({ children }) => {
  const router = useRouter()
  const match = router.asPath.match(/[^?]+/)
  const pathname = match ? match[0] : router.asPath

  const location = useMemo(
    () =>
      process.browser
        ? window.location
        : ({
            search: router.asPath.replace(/[^?]+/u, ""),
          } ),
    [router.asPath]
  )

  const history = useMemo(
    () => ({
      push: ({ search }) =>
        router.push(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true, scroll: false }
        ),
      replace: ({ search }) =>
        router.replace(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true, scroll: false }
        ),
    }),
    [pathname, router]
  )

  return (
    <ContextProvider history={history} location={location}>
      {children}
    </ContextProvider>
  )
}

export const QueryParamProvider = memo(QueryParamProviderComponent)
