# Theming

ui-kit components currently support theming with different color schemes. You can theme your app by wrapping it in the `UIKitThemeProvider` component, and passing a theme to the `appTheme` prop.

By default, the component color scheme adheres to the branding used in [DC/OS UI](https://github.com/dcos/dcos-ui). Any theme properties you don't define in `appTheme` will fall back to the defaults.

## Theming interface

### Inverse color context

You've probably noticed most colors have an "inverted" variant. For most themes, this will be a dark background color, but it could also be a light background color.

For example, we want the `Toast` and the `Tooltip` component to stand out against our default white background, so their background colors are set to `bgPrimaryInverted`, and their text and icons are tinted to `textColorPrimaryInverted` by using the globally injected `inverseColorMode` class.

### appTheme properties

#### Branding

| `appTheme.colors`        | Description                                                                     |
| :----------------------- | :------------------------------------------------------------------------------ |
| `brandPrimary`           | Main brand color. Mostly used for accent colors like primary button backgrounds |
| `brandPrimaryInverted`   | The version of `brandPrimary` to use in the inverse color context               |
| `brandSecondary`         | The second brand color. Not yet used in any components                          |
| `brandSecondaryInverted` | The version of `brandSecondary` to use in the inverse color context             |

#### States

| `appTheme.colors` | Description                                                               |
| :---------------- | :------------------------------------------------------------------------ |
| `success`         | Represents something positive. Used for things like successful validation |
| `successInverted` | The version of `success` to use in the inverse color context              |
| `warning`         | Represents a potential hazard that could occur                            |
| `warningInverted` | The version of `warning` to use in the inverse color context              |
| `error`           | Represents errors or deletion                                             |
| `errorInverted`   | The version of `error` to use in the inverse color context                |

#### Backgrounds

| `appTheme.colors`     | Description                                                                                                               |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `bgPrimary`           | The default background color                                                                                              |
| `bgPrimaryInverted`   | The default background color for the inverse color context                                                                |
| `bgSecondary`         | A secondary background color that can be used to visually separate an area of the UI. Used in the fullscreen modal header |
| `bgSecondaryInverted` | The version of `bgSecondary` to use in the inverse color context                                                          |
| `bgHover`             | Default background color for hover states. Used on things like dropdown menu items and table rows                         |
| `bgHoverInverted`     | The version of `bgHover` to use in the inverse color context                                                              |
| `bgScrim`             | The color that overlays the UI for drawing focus to things like dialog modals                                             |
| `bgSelected`          | The background color that appears behind a selected item. Used on things like dropdown menu items                         |
| `bgSelectedInverted`  | The version of `bgSelected` to use in the inverse color context                                                           |
| `bgAppHeader`         | The background color for the `HeaderBar`                                                                                  |

#### Text

| `appTheme.colors`              | Description                                                                    |
| :----------------------------- | :----------------------------------------------------------------------------- |
| `textColorPrimary`             | The default text color                                                         |
| `textColorPrimaryInverted`     | The default text color for the inverse color context                           |
| `textColorSecondary`           | The de-emphasized text color. Used for things like hint text                   |
| `textColorSecondaryInverted`   | The version of `textColorSecondary` to use in the inverse color context        |
| `textColorInteractive`         | The color for text that a user can tap. Used for things like buttons and links |
| `textColorInteractiveInverted` | The version of `textColorInteractive` to use in the inverse color context      |

#### Decorators

| `appTheme.colors`     | Description                                                      |
| :-------------------- | :--------------------------------------------------------------- |
| `border`              | The default border color for the inverse color context           |
| `borderInverted`      | The default border color                                         |
| `borderHeavy`         | The color used for emphasized borders                            |
| `borderHeavyInverted` | The version of `borderHeavy` to use in the inverse color context |
| `shadow`              | The default color for shadows                                    |
| `shadowInverted`      | The default color for shadows for the inverse color context      |

## Usage in ui-kit

### CSS Variables (preferred usage)

`UIKitThemeProvider` also injects theme properties as CSS variables on the document root (`<html>`). ui-kit also generates [design tokens]() that can be used to style CSS-in-JS with fallback values built in. The fallback values adhere to the branding used in DC/OS UI.

The custom properties follow this naming pattern: `--theme{PropertyName}`.
The design tokens follow a similar naming pattern: `theme{PropertyName}`.

#### Example:

If you wrapped your app in

```JSX
<UIKitThemeProvider appTheme={{colors: {
    brandPrimary: "#F00F00"
}}} />
```

You could use the CSS variable for `brandPrimary` in emotion like this:

```JS
import { css } from "@emotion/css";
import { themeBrandPrimary } from "@dcos/ui-kit/dist/packages/design-tokens/build/js/designTokens";

export const brandedBg = css`
    background-color: ${themeBrandPrimary};
`;
```

Or you could use the CSS variable directly like this:

```CSS
.brandedBg {
    background-color: var(--themeBrandPrimary, #F00F00);
}
```

### Emotion

ui-kit uses Emotion for styling, and `UIKitThemeProvider` wraps it's children in Emotion's `ThemeProvider` component. This means you can if you're using Emotion's theming tools, you'll have access to the theme data passed to `UIKitThemeProvider`'s `appTheme` prop.

#### Example:

If you wrapped your app in

```JSX
<UIKitThemeProvider appTheme={{colors: {
    brandPrimary: "#F00F00"
}}} />
```

You can use Emotion's `ThemeProvider` component like this:

```JSX
const BrandedText = styled("span")`
    ${props => {
        const { brandPrimary } = props.theme.appTheme;
        return `
            color: ${brandPrimary || "#F00F00"};
        `}
    }
`;

const adjustedTheme = ancestorTheme => ({...ancestorTheme});
<ThemeProvider theme={adjustedTheme}>
    <BrandedText>Branded</BrandedText>
</ThemeProvider>
```

Or you can use Emotion's `useTheme` hook:

```JSX
const TintedText = ({tintColor, children}) => (
    <span style={{color: tintColor}}>{children}</span>
);

const BrandedText = () => {
    const theme = useTheme();
    const { brandPrimary } = theme.appTheme;
    return(
        <TintedText tintColor={brandPrimary || "#F00F00"}>Branded</TintedText>
    );
}
```
