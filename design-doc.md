## Table of Contents


{{TOC}}



## Links to Old Documents {#links-to-old-documents}



*   [https://docs.google.com/document/d/1b7Or5gidpfQenkGR4dysz9ShEWgrWxxPJuQUBrnRXvs/edit#heading=h.3svxzuabblb4](https://docs.google.com/document/d/1b7Or5gidpfQenkGR4dysz9ShEWgrWxxPJuQUBrnRXvs/edit#heading=h.3svxzuabblb4)
*   [https://docs.google.com/document/d/1smOrLXBs4E9KvRcjFzVFSGRLSOdJFioi8HHv_xvMlCI/edit](https://docs.google.com/document/d/1smOrLXBs4E9KvRcjFzVFSGRLSOdJFioi8HHv_xvMlCI/edit)
*   [https://docs.google.com/document/d/1hFMPtjQnlscUwIauxcjAPxFmRAgruZ-6TBnKGEW4PWc/edit#heading=h.3svxzuabblb4](https://docs.google.com/document/d/1hFMPtjQnlscUwIauxcjAPxFmRAgruZ-6TBnKGEW4PWc/edit#heading=h.3svxzuabblb4)
*   [https://docs.google.com/document/d/1-V07kO9L1mab8GV1-OQoLTAIDPZyWi5P_PRoIsEHeik/edit#heading=h.3svxzuabblb4](https://docs.google.com/document/d/1-V07kO9L1mab8GV1-OQoLTAIDPZyWi5P_PRoIsEHeik/edit#heading=h.3svxzuabblb4)
*   [https://docs.google.com/document/d/1fiRlWzmeHYXGtMXEUCcs82sLQDyZc1oSdY5lUs566jc/edit](https://docs.google.com/document/d/1fiRlWzmeHYXGtMXEUCcs82sLQDyZc1oSdY5lUs566jc/edit)
*   [https://docs.google.com/document/d/1p8IW_QuzMO6EhLiBOPJY0FqD0ZoS64-7M_aZvP9y2-8/edit#](https://docs.google.com/document/d/1p8IW_QuzMO6EhLiBOPJY0FqD0ZoS64-7M_aZvP9y2-8/edit#)
*   [https://github.com/dcos-labs/ui-kit/blob/master/CONTRIBUTING.md](https://github.com/dcos-labs/ui-kit/blob/master/CONTRIBUTING.md)
*   [https://docs.google.com/document/d/1p-CnUnhNFVz6WomPQvMEsTybbGgV0FHWgsUzBqX64cs/edit#heading=h.apvnjfls8tkq](https://docs.google.com/document/d/1p-CnUnhNFVz6WomPQvMEsTybbGgV0FHWgsUzBqX64cs/edit#heading=h.apvnjfls8tkq)


## Living Document

This is a living document[^1]. Feel free to add or change information. Everybody should be able to contribute to this document.


## General Guidelines


### Why are we building the design system?

Have one source of truth, build a consistent product across company

and platforms, increase developer productivity and feature delivery.


### When does a component go into ui-kit

Ui-kit follows the rules of three, which means once a component is used in 3 different places it should be added to ui-kit.


### Flexibility

We are trying to avoid unnecessary flexibility of a component. There is always room for building on the existing component or creating a new component for a different use case. Always when adding flexibility for another use case consider adding a new component instead or ensure that the complexity of the component is not exploding.


### Considerations


#### Avoid weak elements

Weak elements are elements which can’t nest block elements, for example, a `p` tag is not able to wrap around a div which will reduce the comparability of a component. This is why we try to rather use a strong element like `section` or `div` instead of `p`.


#### Declare Prop Types

Since the `ui-kit` is using typescript please make sure to define proper prop types for your components. This will improve the documentation, which creates dynamically and will provide better error messages for the users. And also this will provide auto-completion in some IDE’s. Describe the props as well as possible, so also define object shapes or array shapes.


#### Never hard code HTML ID’s

This might conflict at some point. If you need an id on the element expose a prop for that so the user can define it based on the application	.


#### Use Logical Defaults

Use prop defaults which make sense this will reduce the efforts needed to adopt this component.


#### A11y Support

A good start on that topic is to read [this website](https://a11yproject.com/) While creating your component think about users: - Which uses keyboards - expose tab indexes as props - Use semantic correct HTML - ARIA


#### Configuration Objects

Please consider using configuration objects as they will provide the user a lot of value by



*   consistency
*   less typing needed
*   less error prone

But please avoid using configuration Objects if you have 3 or fewer properties.

A example pattern for this can be found [here](#configuration-objects).


#### Single Responsibility Principle

Keep the components simple by applying them to a single responsibility. In that way, the component will stay simple in most cases. Try not to introduce unnecessary props. Each prop is a configuration which will automatically increase the complexity. Before adding a property to an existing component ask yourself if this could be a new component.


#### Keep Components Simple

It's important to keep components as simple as possible, add logic to a component if it improves performance or quality of that component. For example, paginating a list if the number of items is exceeding a certain amount or having a show toggle to show more content like a dropout.


#### Props should be attributes not children

Props should be attributes of a component and not children of a component. This means that properties should never get JSX as a type. If JSX is used we should consider adding sub components. So instead of


```
<Page
  Sidebar={
    <ul>
      <li>
        <a href="#home">home</a>
      </li>
    </ul>
  }
/>
```


Consider something like:


```
<Page>
  <Sidebar>
    <ul>
      <li>
        <a href="#home">home</a>
      </li>
    </ul>
  </Sidebar>
</Page>
```



## Component Guidelines

Each component should follow a common guideline, so that all components are reasonable within our ideals and they feel like a collection of similar working component. This will increase the ease of use for customers. To ensure this we try to put the most applicable things into this document.


### General patterns


#### Configuration Objects

Configuration Objects should be used when you have more the 3 properties for a component. They have multiple advantages as described [in this section](#configuration-objects).

Example:


```
<Component style="wide" color="awesome" data={data} advanced />
```


Should be:


```
<Component config={{
  style: "wide",
  color: "awesome",
  data,
  Advanced: true
}} />
```



#### Named slots

Named slots are a way to describe certain areas of a component like `sidebar,` `header` and `content `to name some very general examples. These could be exposed as props but this often should not be the case. Since props are intended to be attributes. We should consider creating a sub component like `<Sidebar>`,` <Header>` and `<Content>` in the example. The intend here is that the component stays composable by that approach instead of being configurable.

Other stuff we might add


### Specific Patterns


[^1]: A **living document**, also known as an **evergreen document** or **dynamic document**, is a [document](https://en.wikipedia.org/wiki/Document) that is continually edited and updated.([https://en.wikipedia.org/wiki/Living_document](https://en.wikipedia.org/wiki/Living_document))
