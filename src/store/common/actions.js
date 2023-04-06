

export async function signIn({ commit }, data) {

  try {
 console.log(data)

    commit('setData', data)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('finall')
  }
}
